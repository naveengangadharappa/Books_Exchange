const updateJsonFile = require('update-json-file')

const LogError = async (UserID, error, file_path, model, option) => {
    try {
        let result = {}
        let today = new Date();
        let date = `Date: ${today.getFullYear()}-${today.getMonth()}-${today.getDate()} Time:  ${today.getHours()} : ${today.getMinutes()} : ${today.getSeconds()}`;
        switch (option) {
            case 'json':
                let logdata = {
                    DateTime: date,
                    UserId: UserID,
                    Errormsg: String(error)
                };
                updateJsonFile(file_path, (data) => {
                    data.log.push(logdata);
                    return data;
                })
                result = { status: true };
                break;
            case 'db': result = { status: true };
                break;
        }
        return result;
    } catch (err) {
        console.log(err);
        return { status: false, message: "err at logging err" };
    }
}

module.exports = { LogError }