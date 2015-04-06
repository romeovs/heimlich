import config from 'config'
import defaults from './defaults'

var conf = config({
  defaults
});

conf = Object.assign(conf, conf.heimlich);

export default conf;
