const { users } = require('../../models');
var session = require('express-session');

module.exports = {
  post: (req, res) => {
    // TODO : 유저가 로그인을 했을 때, 회원정보를 데이터베이스에서 확인하고, 회원의 id를 session에 담아주도록 구현하세요.
    /**
     * 1. POST 요청이 /user/signin 으로 날아오는 것을 핸들링하라
     *  email, password 라는 Key 를 담은 형태로 날아옴
     * 2. 그렇게 받은 값을 통해서 validity 를 검증하라
     *  경우1. email 자체가 존재하지 않는 경우
     *  경우2. email 는 존재하는데 올바르지 않는 pw 를 입력한 경우
     *  경우3. email 와 pw 가 전부 올바른 경우
     * 3. 경우1, 경우2 => 'unvalid user' 라는 메시지와 함께 404 status code response
     *    경우3 => 해당 user record 에서 id 항목을 return 한다
     */
    let userData = req.body;
    users
      .findOne({
        where: { email: userData.email },
      })
      .then((val) => {
        // 경우1. email 자체가 존재하지 않는 경우
        if (val === null) {
          res.status(404).send('unvalid user');
        } else {
          let justLoggedUser = val.dataValues;
          // 경우3. email 와 pw 가 전부 올바른 경우
          if (justLoggedUser.password === userData.password) {
            console.log(
              'req.session',
              (req.session.userid = justLoggedUser.id)
            );
            // req.session.userid = justLoggedUser.id;
            res.send({ id: req.session.userid });
            // 경우2. email 는 존재하는데 올바르지 않는 pw 를 입력한 경우
          } else {
            res.status(404).send('unvalid user');
          }
        }
      });
  },
};
