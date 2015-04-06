import config from 'config'
import path   from 'path'

export default config({
  absolute: path.join(__dirname, 'config')
});
