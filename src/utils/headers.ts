import yadisk from '../yadisk.config.json'

export default {
  'Content-type': 'application/json',
  Authorization: `OAuth ${yadisk.DEBUG_TOKEN}`,
}