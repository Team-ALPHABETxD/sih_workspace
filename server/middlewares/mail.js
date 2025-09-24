const MAIL_SERVER_API = 'http://127.0.0.1:8080/automail'

const sendMail = async(report) => {
    try {
        const res = await fetch(`${MAIL_SERVER_API}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(report)
        })

        if (!res.ok) {
            console.log(`API Error: ${res.status} ${res.statusText}`)
            return { flag: "err", msg: "Issue occurs in mail sending." }
        }

        const data = await res.json()
        console.log(data)
        return data
    } catch (error) {
        console.log('Error in mail server:', error)
        return { flag: "err", msg: "Issue occurs in mail sending." }
    }
}

module.exports = { sendMail }