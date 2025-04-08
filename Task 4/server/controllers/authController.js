const authService = require('../services/authService');

exports.login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    if (error.message === 'שם משתמש או סיסמה שגויים') {
      res.status(401).json({success: false, message: error.message });
    } else {
      res.status(500).json({success: false, message: 'שגיאה בשרת', error: error.message });
    }
  }
};
