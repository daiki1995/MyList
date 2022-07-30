module.exports = {

    mode: "development",

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: `./src/pages/battle.js`,
  
    // ファイルの出力設定
    output: {
      //  出力ファイルのディレクトリ名
      path: `${__dirname}/serv/public/javascripts`,
      // 出力ファイル名
      filename: "battle.js"
    },

    

    module: {
        rules: [
            {
                test:/\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },

            {
                test:/\.css$/,
                use: [{ loader: 'style-loader' },
                    {loader:'css-loader'}]
            }
        ]
    }

    

  };

  