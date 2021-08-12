module.exports = {

    mode: "development",

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: `./index.js`,
  
    // ファイルの出力設定
    output: {
      //  出力ファイルのディレクトリ名
      path: `${__dirname}/dist`,
      // 出力ファイル名
      filename: "index.js"
    },

    devServer: {
        contentBase: outputPath
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
            }
        ]
    }

    

  };

  