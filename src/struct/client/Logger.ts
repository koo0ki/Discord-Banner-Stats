import colors from 'colors'

export class Logger {
    getDate () {
        return new Date().toLocaleString()
    }

    error (msg: string) {
        console.log(
            colors.red(`[${this.getDate()}] `) + msg
        )
    }

   info (msg: string) {
        console.log(
            colors.blue(`[${this.getDate()}] `) + msg
        )
    }
}