const { users } = require('../../models');

module.exports = {
  post: (req, res) => {
    // TODO : 유저가 회원가입을 했을 때, 회원정보를 데이터베이스에 저장하도록 구현하세요.
    /**
     * 1. request 의 body 를 받기, 구조는 적혀있는 대로...
     * 2. 각 항목을 users 라는 table 에 INSERT INTO 로 생성해준다.
     * 3. 해당 생성 결과물들을 res.body 에 담아서 보내주어야 한다.
     * 4. 이미 존재하는 계정의 경우 "already exist user" 라는 메시지를 보내고, 별도의 DB 생성은 하지 않고 response 를 날린다.
     *  4-1. "이미 존재한다" 의 기준은, DB에 email 이 이미 존재하는 경우를 의미한다.
     */
    let userData = req.body;
    users
      .findOrCreate({
        where: {
          email: userData.email,
        },
        defaults: {
          email: userData.email,
          username: userData.username,
          password: userData.password,
        },
      })
      .then(([find, created]) => {
        if (!created) {
          res.status(409).send('Already exists user');
        } else {
          res.status(200).send(find);
        }
      });
  },
};
