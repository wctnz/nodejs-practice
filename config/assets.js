import hbs from "hbs"
import path from "path"

const __dirname = path.resolve()

export function setupAssets(app, express) {
  app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
  
  app.set('view engine', 'hbs')
  hbs.registerPartials(path.join(__dirname, 'views/partials'))
  
  hbs.registerHelper('formatTime', function (date) {
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
  })

  hbs.registerHelper("when", function(operand_1, operator, operand_2, options) {
    const operators = {
     'eqObj': function(l,r) { return l.toString() === r.toString() }
    }
    const result = operators[operator](operand_1,operand_2)
  
    if (result) return options.fn(this)
    else return options.inverse(this)
  })
}