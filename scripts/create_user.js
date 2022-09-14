require('../src/db/mongoose');

const User = require('../src/models/user.model');
const Voice = require('../src/models/voice.model');

const emails = ["ng.hoaibao03ht@gmail.com"];
  
  // "vuthuytrang_t65@hus.edu.vn", "nguyenquockhanh_t65@hus.edu.vn", "vuongthuyduong_t65@hus.edu.vn", "phamnhukhoa_t65@hus.edu.vn", "nguyenthiduyen1_t65@hus.edu.vn", "lethidung_t65@hus.edu.vn", "tranquynh262728@gmail.com", " hoangthihao_t65@hus.edu.vn", "domanhhung_t65@hus.edu.vn ", "nguyentiendat5_t66@hus.edu.vn", "trantuanvu_t66@hus.edu.vn", "Caoletuongvy@gmail.com", "tonnumaikhanh_t66@hus.edu.vn", "nguyenthihuyensam_t66@hus.edu.vn", "hoangtouyen_t66@hus.edu.vn", "kinngantran2k3@gmail.com", "nguyenhoangduong_t66@hus.edu.vn", "ng.hoaibao03ht.gmail.com", "letruonggiang7gpl@gmail.com", "truongminhhieu_t66@hus.edu.vn", "nguyenducnam_t66@hus.edu.vn", "Tranquangkhai_t64@hus.edu.vn", "laducnam_t65@hus.edu.vn", "doduc0610@gmail.com", "phamhongnghia_t65@hus.edu.vn", "letuandan_t66@hus.edu.vn", "nguyenthikhanhlinh1_t65@hus.edu.vn", "lethithuydung_t65@hus.edu.vn", "nguyentrongdung_t65@hus.edu.vn", "daoxuanthang_t65@hus.edu.vn"];

(async () => {
  for await (const email of emails) {
    User.create({
      role: 2,
      email: email,
      name: email.split('@')[0],
      password: '12345678'
    });
  }
})();