const fs = require('fs');
const os = require('os');
const spawn = require('child_process').spawn;

const base_dir = __dirname;
const pngdefry_src_path = base_dir + "/pngdefry-master";
//Everything seems ok.
//Rename pngdefry path
//Let's configure the tool
try {
  process.chdir(pngdefry_src_path);
} catch (err) {
  process.exit();
}
const pngdefry_configure_file = "./configure";
const params = [pngdefry_configure_file];
var pngdefry_config = spawn('sh', params);

pngdefry_config.on('exit', function (code, signal) {
  if (code != null) {

    var pngdefry_make = spawn('make');

    pngdefry_make.on('exit', function (code, signal) {
      if (code != null) {
        var pngdefry_make_install = spawn('make', ['install']);
        pngdefry_make_install.on('exit', function (code, signal) {

        });
        pngdefry_make_install.on("error", function (err) {
          console.log(err)
        });
      }
    });
    pngdefry_make.on("error", function (err) {
      console.log(err)
    });
  }
});

pngdefry_config.on("error", function (err) {
  console.log(err);
});

//   process.exit();

