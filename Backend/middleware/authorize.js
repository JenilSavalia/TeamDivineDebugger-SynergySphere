export const isManager = (req, res, next) => {
  const user = req.user; // make sure req.user is already set by your previous auth process or token decoding

  if (!user) {
    return res.status(401).json({ success: false, message: 'User not found' });
  }

  if (user.role !== 'PROJECT_MANAGER') {
    return res.status(403).json({ success: false, message: 'Only managers can perform this action' });
  }

  next(); // user is a manager, continue
};
