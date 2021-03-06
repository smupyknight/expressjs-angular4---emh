
var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost:27017/emh_db');

var models = {};
var modelNames = [
	'Category',
	'Product',
	'Buyer',
	'Seller',
	'News',
	'Order',
	'Transaction',
	'RecurringOrder',
	'Return',
	'ReturnAction',
	'ReturnReason',
	'ReturnStatus',
	'User',
	'UserGroup',
	'AbstractCommission',
	'HistoricalOrder',
	'Advert',
	'Message',
	'Comment',
	'Media',
	'Newsletter',
	'Slideshow',
	'Partner',
	'Collaboration',
	'PaymentMethod',
	'ShippingSetting',
	'ShippingReport',
	'LandingPage',
	'SubscriptionGroup',
	'StoreLocation',
	'Language',
	'Currency',
	'StockStatus',
	'OrderStatus',
	'Store',
	'SocialLink',
	'Badge',
	'TaxSummary',
	'DebugError',
	'Wishlist',
	'Download',
	'RecurringPayment',
	'RewardPoint',
	'FilterGroup',
	'Filter',
	'Option',
	'CustomerGroup',
	'LengthClass',
	'WeightClass',
	'TaxClass',
	'TaxRate',
	'GeoZone',
	'SellerGroup',
	'VoucherTheme',
	'Country',
	'Zone'
];

for (var i = 0; i < modelNames.length; i++) {
	models[modelNames[i]] = require('./' + modelNames[i].toLowerCase() + '.js')(mongoose, connection);
}

module.exports = models;