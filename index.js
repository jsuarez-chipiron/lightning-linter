var JSONPath = require('JSONPath');
var fs = require('fs');
cli = require("eslint/lib/cli");

// var outFile = "out.csv";
var outFile = process.argv[3];
var inputDir = process.argv[2];


var micallback = function(x){	
	
	// console.log('FILE: '+x.filePath);
	// console.log(x.result.length);
	for (let i=0; i<x.messages.length; i++){
		// console.log(x.result[i]+' _________')
		if (x.messages[i].ruleId !== 'no-undef' && x.messages[i].message !== "'$A' is not defined."){
			let severity = (x.messages[i].severity===2)?'error':((x.messages[i].severity===1)?'warning':'no-supported');
			// console.log("message: "+x.messages[i].message);
			// console.log("ruleId: "+x.messages[i].ruleId);
			// console.log("source: "+x.messages[i].source);
			// console.log("line: "+x.messages[i].line);
			// console.log("column: "+x.messages[i].column);
			// console.log("===================");
			fs.appendFileSync(outFile, x.filePath+",\""+severity+"\",\""+x.messages[i].message+"\",\""+x.messages[i].ruleId+"\","+x.messages[i].line+","+x.messages[i].column+",\""+x.messages[i].source+"\"\n"); 
		}
	}	
}

var args = [ 'node',
  './node_modules/eslint/bin/eslint.js',
  inputDir,
  '-c',
  './node_modules/lightning-linter/my_rules.json',
  '-o',
  'output.json',
  '-f',
  'json' ];

process.exitCode = cli.execute(args);

var mijson = JSON.parse(fs.readFileSync('output.json', 'utf8'));

try{
	fs.unlinkSync(outFile);
}catch(err){
	console.log(err);
}

fs.appendFileSync(outFile, "file,type,message,ruleId,line,column,source\n");

JSONPath({json: mijson, path: '$..filePath^', callback: micallback});

try{
	fs.unlinkSync('output.json');
}catch(err){
	console.log(err);
}
console.log('LINTER OK');

// var args = [ '/usr/local/bin/node',
//   '/Users/jsuarez/Documents/3_Informatica/Javascript/node/MyLinter/node_modules/eslint/bin/eslint.js',
//   '/Users/jsuarez/Documents/3_Informatica/0_Salesforce/10_Tips_and_tools/5_force_cli/metadata/aura/',
//   '-c',
//   '/Users/jsuarez/Documents/3_Informatica/Javascript/node/MyLinter/my_rules.json' ];

