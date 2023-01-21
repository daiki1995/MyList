
 const judgement ={
    mode: "development",

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: `./src/pages/judgement.js`,
  
    // ファイルの出力設定
    output: {
      //  出力ファイルのディレクトリ名
      path: `${__dirname}/serv/public/javascripts`,
      // 出力ファイル名
      filename: "judgement.js"
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

  const thema = {

    mode: "development",

    // メインとなるJavaScriptファイル（エントリーポイント）
    entry: `./src/pages/themaJudg.js`,
  
    // ファイルの出力設定
    output: {
      //  出力ファイルのディレクトリ名
      path: `${__dirname}/serv/public/javascripts`,
      // 出力ファイル名
      filename: "themaJudg.js"
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

  module.exports=[
    judgement,thema
  ];