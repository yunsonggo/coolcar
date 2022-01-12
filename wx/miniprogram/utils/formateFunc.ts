export namespace formateFunc {
    export function padString(n: number) {
        return n < 10 ? '0' + n.toFixed(0) : n.toFixed(0)
    }
    // 计时格式转换
    export function formatDuration(sec: number) {
        const h = Math.floor(sec / 3600)
        sec -= 3600 * h
        const m = Math.floor(sec / 60)
        sec -= 60 * m
        const s = Math.floor(sec)
        return {
            hh: padString(h),
            mm: padString(m),
            ss: padString(s),
        }
    }

    // 计费格式转换 单位 分
    export function formatFee(cents: number) {
        return (cents / 100).toFixed(2)
    }

    export function formateDate(dateMillis: number) {
        const dt = new Date(dateMillis)
        const y = dt.getFullYear()
        const m = dt.getMonth() + 1
        const d = dt.getDate()
        return `${padString(y)}:${padString(m)}:${padString(d)}`
    }

    export function isJsonString(str: any) {
        if (typeof str === 'string') {
            try {
                if (typeof JSON.parse(str) === 'object') {
                    return true
                }
            } catch (e) { }
        }
        return false
    }
}