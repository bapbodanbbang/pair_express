module.exports = {
  post: (req, res) => {
    // TODO : 유저가 로그아웃했을 때, session 정보를 없애고, '/'로 redirect할 수 있도록 구현하세요.
    /**
     * 1. POST 요청이 /user/signout 으로 발송되는 것을 핸들링하라, 단 body 는 없다
     * 2. req.cookies.userid 를 cookies 로 부터 제거한다. → 해당 항목이 비어있는 cookie 를 return 하는 건 어떤가?
     * 3. '/' 로 redirect 시킨다 → res.redirect() 를 통해 구현한다.
     */

    if (req.session.userid) {
      // session.userid 있다면
      res.session.destoy((err) => {
        // 세션삭제
        if (err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
      });
    }
    res.redirect('/');
  },
};

// 참고 벨로퍼트 https://velopert.com/406
