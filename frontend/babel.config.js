module.exports = {
  presets: [
    '@babel/preset-env', // vai verificar quais as funcionalidades mais modernas do js que os browsers não entendem e disponibilizar (por exemplo atender o IE10)
    '@babel/preset-react' // vai adicionar as funcionalidades do react no processo de conversão
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ]
}