const { users } = require('../../models');

// TODO : 유저의 session을 이용하여, 데이터베이스에 있는 정보를 제공하도록 구현하세요.
// 일단은 express-session 없이 돌아가나 test
// 맞으면 200
// 아니면 401, 'need user session'
module.exports = {
  get: async (req, res) => {
    let userSession = await req.session;
    if (userSession.userid) {
      users
        .findOne({
          where: {
            id: userSession.userid,
          },
        })
        .then((data) => {
          res.status(200).send(data);
        });
    } else {
      res.status(401).send('need user session');
    }
  },
};
