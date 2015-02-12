var enbBemTechs = require('enb-bem-techs'),
    path = require('path');
    isProd = process.env.YENV === 'production';

module.exports = function (config) {

    config.includeConfig('enb-bem-specs');

    var specs = config.module('enb-bem-specs').createConfigurator('specs');

    specs.configure({
        destPath : 'desktop.specs',
        levels : [ 'common.blocks' ],
        sourceLevels : [
            { path : path.join('libs', 'bem-core', 'common.blocks'), check : false },
            { path : path.join('libs', 'bem-pr', 'spec.blocks'), check : false },
            'common.blocks'
        ],
        jsSuffixes : [ 'vanilla.js', 'js', 'browser.js' ]
    });

    config.nodes('*.bundles/*', function (nodeConfig) {
        nodeConfig.addTechs([
            // essential
            [require('enb/techs/file-provider'), { target: '?.bemdecl.js' }],
            [enbBemTechs.files],
            [enbBemTechs.deps],
			// css
			[require('enb-stylus/techs/css-stylus'), { target: '?.noprefix.css' }],
			// bemhtml
			[require('enb-bemxjst/techs/bemhtml-old'), { devMode: process.env.BEMHTML_ENV === 'development' }]
        ]);

        nodeConfig.addTargets([
			'?.css',
			'?.bemhtml.js'
        ]);
    });

	config.nodes('*desktop.bundles/*', function (nodeConfig) {
		nodeConfig.addTechs([
			// essential
			[enbBemTechs.levels, { levels: getDesktops(config) }],
			// autoprefixer
			[require('enb-autoprefixer/techs/css-autoprefixer'), {
				browserSupport: ['last 2 versions', 'ie 10', 'ff 24', 'opera 12.16'],
				sourceTarget: '?.noprefix.css'
			}]
		]);
	});

};

function getDesktops(config) {
	return [
		{ path: 'libs/bem-core/common.blocks', check: false },
		{ path: 'libs/bem-core/desktop.blocks', check: false },
		'common.blocks',
		'desktop.blocks'
	].map(function (level) {
		return config.resolvePath(level);
	});
}
