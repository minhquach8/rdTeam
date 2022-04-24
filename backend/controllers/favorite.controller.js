const { StatusCodes } = require("http-status-codes");
const Favorite = require("../models/Favorite");
const CompanyInfo = require("../models/CompanyInfo");

exports.getFavorites = async (req, res) => {
	const favorite = await Favorite.find({ UserId: req.user._id });
	// if (favorite.length === 0) {
	// 	return res.status(404).json({ message: "No favorite found" });
	// }
	const favorites = [];

	for (item of favorite) {
		const query = await CompanyInfo.aggregate([
			{ $match: { _id: item.CompanyId } },
			{
				$lookup: {
					from: "stocks",
					as: "Ticker",
					let: { ticker: "$Ticker" },
					pipeline: [
						{ $match: { $expr: { $eq: ["$$ticker", "$Ticker"] } } },
						{ $sort: { TimeStamp: -1 } },
						{ $limit: 1 },
						{ $project: { _id: 0 } },
					],
				},
			},
			{ $project: { Ticker: 1 } },
		]);
		favorites.push({
			_id: item._id,
			CompanyId: item.CompanyId,
			Ticker: query[0].Ticker,
		});
	}
	favorites.sort(function (a, b) {
		if (a.Ticker[0].Ticker < b.Ticker[0].Ticker) return -1;
		if (a.Ticker[0].Ticker > b.Ticker[0].Ticker) return 1;
		return 0;
	});
	res.status(200).json({ favorites });
};

exports.createFavorite = async (req, res) => {
	try {
		req.body.UserId = req.user._id;
		const favorite = await Favorite.findOne({ UserId: req.body.UserId, CompanyId: req.body.CompanyId });
		if (favorite) {
			return res.status(409).json({message: 'Already in favorites'})
		} else {
			const favorites = await Favorite.create(req.body);
			res.status(StatusCodes.CREATED).json({ favorites });
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
	
};

exports.deleteFavorite = async (req, res) => {
	const favorites = await Favorite.deleteOne({
		CompanyId: req.params.companyId,
	});
	if (favorites.deletedCount === 0) {
		throw new NotFoundError("No reminder with this id");
	}
	// if (!favorites) {
	// }
	res.status(200).json({ favorites });
};
