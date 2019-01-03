/*
 * 获取命令参数选项(暂时废弃使用，以为和webpack-cli的参数取值有冲突)
 */
const program = require('commander');
let commandOptions = null;

function getCommandOptions() {
    if (!commandOptions) {
        let argv;
        try {
            // get parameter from npm command
            argv = JSON.parse(process.env.npm_config_argv).original;
        } catch (ex) {
            argv = process.argv;
        }
        program
            .version('0.0.1')
            .option('-p, --project <name>', 'compile project')
            .option('-c, --component <name>', 'compile tpc')
            .parse(argv);
        commandOptions = {
            project: program.project,
            component: program.component
        };
    }
    return commandOptions;
}

module.exports = getCommandOptions;
