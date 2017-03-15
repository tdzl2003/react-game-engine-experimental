/**
 * Created by tdzl2003 on 2017/3/15.
 */

if (__WEBWORKER__) {
  require('bridge/client').install();
} else {
  require('bridge/dummy').install();
}