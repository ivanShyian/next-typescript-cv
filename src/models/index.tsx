import {ConfigInterface} from '@/models/Config'
import {AboutInterface} from '@/models/About'

export interface StateInterface {
  config: {
    config: ConfigInterface
  }
  about: {
    about: AboutInterface
  }
}