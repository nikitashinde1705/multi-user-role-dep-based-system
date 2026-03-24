const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.user?.role?.permissions.includes(permission)) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
};

export default checkPermission;