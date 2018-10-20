const Router = require("nextjs-dynamic-routes");

const router = new Router();

router.add({ name: "item", pattern: "/item/:id" });
router.add({ name: "browse", pattern: "/browse" });
router.add({ name: "index", pattern: "/index" });
router.add({ name: "admin", pattern: "/admin" });
router.add({ name: "error", pattern: "/error" });
router.add({ name: "login", pattern: "/login" });
router.add({ name: "myprofile", pattern: "/myprofile" });
router.add({ name: "register", pattern: "/register" });
router.add({ name: "sell", pattern: "/sell" });
router.add({ name: "settings", pattern: "/settings" });

module.exports = router;
