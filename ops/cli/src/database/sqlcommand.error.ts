export class SQLCommandError extends Error {
    constructor(command: string, error:any) {
        super("Error executing command: << " + command + " >>", {cause:error}); 
        this.name = "CommandError"; 
    }
}