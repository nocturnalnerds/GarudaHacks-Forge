import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './MalinKundang.css';
import img1 from '../assets/Malin Kundang/1.png';
import img2 from '../assets/Malin Kundang/2.png';
import img3 from '../assets/Malin Kundang/3.png';
import img4 from '../assets/Malin Kundang/4.png';
import img5 from '../assets/Malin Kundang/5.png';
import img6 from '../assets/Malin Kundang/6.png';
import img7 from '../assets/Malin Kundang/7.png';
import img8 from '../assets/Malin Kundang/8.png';
import img9 from '../assets/Malin Kundang/9.png';
import img10 from '../assets/Malin Kundang/10.png';
import img11 from '../assets/Malin Kundang/11.png';
import img12 from '../assets/Malin Kundang/12.png';
import img13 from '../assets/Malin Kundang/13.png';
import img14 from '../assets/Malin Kundang/14.png';
import img15 from '../assets/Malin Kundang/15.png';
import img16 from '../assets/Malin Kundang/16.png';
import img17 from '../assets/Malin Kundang/17.png';
import img18 from '../assets/Malin Kundang/18.png';
import img19 from '../assets/Malin Kundang/19.png';
import img20 from '../assets/Malin Kundang/20.png';
import img21 from '../assets/Malin Kundang/21.png';
import img22 from '../assets/Malin Kundang/22.png';
import img23 from '../assets/Malin Kundang/23.png';
import img24 from '../assets/Malin Kundang/24.png';

import axios from 'axios';
// --- Placeholder Data ---


const storyData = {
  jawa: [
    { text: 'Ing sawijining desa, ana bocah lanang jenenge Malin Kundang.', audio: 'jawa-1.mp3' },
    { text: 'Malin pamit marang ibune arep merantau.', audio: 'jawa-2.mp3' },
    { text: 'Sawise sukses, Malin bali numpak kapal gedhe.', audio: 'jawa-3.mp3' },
    { text: 'Ibune seneng banget, nanging Malin ora ngakoni ibune.', audio: 'jawa-4.mp3' },
    { text: 'Ibune lara ati lan ngutuk Malin dadi watu.', audio: 'jawa-5.mp3' }
  ],
  sunda: [
    { text: 'Di hiji desa, aya budak lalaki ngaranna Malin Kundang.', audio: 'sunda-1.mp3' },
    { text: 'Malin amitan ka indungna rék ngumbara.', audio: 'sunda-2.mp3' },
    { text: 'Saatos suksés, Malin uih deui naék kapal anu ageung.', audio: 'sunda-3.mp3' },
    { text: 'Indungna bungah pisan, tapi Malin teu ngaku ka indungna.', audio: 'sunda-4.mp3' },
    { text: 'Indungna nyeri haté teras nyumpahan Malin janten batu.', audio: 'sunda-5.mp3' }
  ],
  bali: [
    { text: 'Ring desa anu asri, wenten anak muani mapesengan Malin Kundang.', audio: 'bali-1.mp3' },
    { text: 'Malin mapamit ring ibunnyane jagi lunga merantau.', audio: 'bali-2.mp3' },
    { text: 'Sasampun sukses, Malin mawali nggenin kapal gede.', audio: 'bali-3.mp3' },
    { text: 'Ibunnyane seneng pisan, nanging Malin nenten ngakuin ibunnyane.', audio: 'bali-4.mp3' },
    { text: 'Ibunnyane sebet pisan raris nastu Malin dados batu.', audio: 'bali-5.mp3' }
  ],
};

const realScript = [
  {
    "Indonesian": "Di sebuah desa nelayan kecil, hiduplah seorang janda tua bersama putranya yang bernama Malin Kundang. Setiap hari mereka berdua hidup dalam kesederhanaan dan saling membantu untuk bertahan hidup.",
    "Javanese": "Ing sawijining desa nelayan cilik, ana biyung tuwa lan anak lanange jenenge Malin Kundang. Saben dinane padha urip prasaja lan kerjo bareng supaya bisa tetep urip.",
    "Bali": "Ring desa nelayan sareng alit, wenten ibu tuwa sareng anak lanang sane rauh Malin Kundang. Mereka sareng prasida urip sederhana sareng saling bantu dados prasida ngalaksanayang hidup.",
    "Sundanes": "Di hiji lembur nelayan leutik, aya hiji indung sepuh jeung anakna lalaki ngaranna Malin Kundang. Maranehna hirup sauyunan jeung hirup sederhana.",
    "Madura": "E desa nelayan se kecil, ajhuna oreng sè janda tor anakna sè lakè-lakè ajhina Malin Kundang. Sabben harè, they idup sederhana tor saling bantu.",
    "Makassar": "Di kampung nelayan kecil, ada seorang ibu tua dan anaknya yang bernama Malin Kundang. Mereka hidup sederhana dan saling bantu tiap hari."
  },
  {
    "Indonesian": "Malin Kundang adalah anak yang rajin dan berbakti pada ibunya. Setiap pagi, ia membantu sang ibu mencari ikan dan kerang di pesisir pantai.",
    "Javanese": "Malin Kundang bocah rajin lan manut karo ibune. Saben esuke, ia mbantu ibune golek iwak lan kerang ning pantai.",
    "Bali": "Malin Kundang dados anak sane makta sareng ibuné. Saben sarengjang, Malin ngantosang ibuné ngala ikan sareng kerang ring pasisi pantai.",
    "Sundanes": "Malin Kundang budak rajin jeung satia ka indungna. Unggal isuk, anjeunna nulungan indungna milari lauk jeung karang di basisir.",
    "Madura": "Malin Kundang anak sè rajin tor bhakti ka èbuna. Sabbhen paggun, ia ngabantui èbuna nyarè ikan rato kerang e pesisir.",
    "Makassar": "Malin Kundang anak yang rajin dan berbakti. Tiap pagi, ia bantu ibunya mencari ikan dan kerang di tepi pantai."
  },
  {
    "Indonesian": "Setelah pulang dari pantai, mereka menjual hasil tangkapan ke pasar untuk membeli kebutuhan sehari-hari. Meski penghasilan mereka kecil, sang ibu selalu tersenyum dan bersyukur.",
    "Javanese": "Sawise saka pantai, ibune lan Malin adol asil tangkapan nang pasar kanggo tuku kebutuhan saben dina. Sanajan penghasilane sithik, ibune tetep mesem lan syukur.",
    "Bali": "Saking dados ring pesisir, ibuné miwah Malin ngajual hasil tangkapan ring pasar ngametuang panguripan. Sanajan adhak ngalaksanayang prasida, ibuné ngidang terus ngucap syukur.",
    "Sundanes": "Ngahiji ti basisir, Malin jeung indungna ngajual hasil buruan maranehna ka pasar. Sanajan duit saeutik, indungna teu weleh mesem jeung syukur.",
    "Madura": "Dari pesisir, Malin rato èbuna ngajual hasil tangkapan e pasar. Walaupun hasilna sèdkit, èbuna tetep bersyukur.",
    "Makassar": "Pulang dari pantai, ibu dan Malin jual hasil tangkapan ke pasar. Meskipun penghasilannya sedikit, ibunya selalu bersyukur."
  },
  {
    "Indonesian": "Pada suatu malam, mereka makan malam sederhana bersama. Sang ibu selalu berdoa agar Malin menjadi anak yang baik dan sukses di masa depan.",
    "Javanese": "Wengi dina iku, Malin lan ibune padha mangan sederhana bareng. Ibune tansah ndonga supaya Malin dadi anak sing sukses lan apikan.",
    "Bali": "Ring peteng puniki, Malin sareng ibuné nglaksanayang ajengan prasida. Ibuné ngaturangang panyunan Malin dados anak becik lan berhasil.",
    "Sundanes": "Peuting, maranehna saing deudeuh dahar kadaharan basajan. Indungna salawasna ngadoa sangkan Malin jadi anak nu sukses.",
    "Madura": "Malem hari itu, Malin rato èbuna makan sederhana bareng. Èbuna terus ngaddu'a supaya Malin jadi anak bagus rato sukses.",
    "Makassar": "Malam itu, mereka makan malam sederhana. Ibunya selalu berdoa supaya Malin menjadi orang baik dan sukses."
  },
  {
    "Indonesian": "Suatu hari, Malin membantu ibunya mengangkut hasil ikan ke rumah. Ia selalu menunjukkan kasih sayang dan kepedulian kepada ibunya.",
    "Javanese": "Sak dina, Malin mbantu ibune nggawa ikan bali menyang omah. Dheweke tansah noto rasa tresna marang ibune.",
    "Bali": "Ring warsa puniki, Malin ngantosang ibuné nglaksanayang ajengan ring griya. Malin tulus sayang ring ibuné.",
    "Sundanes": "Hiji poe, Malin nulungan indungna mawa lauk mulang ka imah. Anjeunna satia jeung sayang ka indungna.",
    "Madura": "Suatu harè, Malin bantu èbuna angkat hasil ikan ka rumah. Malin sangat sayang rato perhatian ka èbuna.",
    "Makassar": "Suatu hari, Malin bantu ibunya membawa ikan ke rumah. Ia selalu menunjukkan kasih sayang dan peduli pada ibunya."
  },
  {
    "Indonesian": "Pada pagi hari, Malin berangkat ke hutan untuk mencari kayu bakar. Ia rajin bekerja demi membantu ibunya.",
    "Javanese": "Esuk, Malin lunga menyang alas golek kayu bakar. Ia rajin kerja supaya bisa nyokong ibune.",
    "Bali": "Ring sarengjang, Malin ajengan ka alas ngidangang kayu ajengan. Ia makarya rajin ngajengan ibuné.",
    "Sundanes": "Isukna, Malin indit ka leuweung néangan kai. Anjeunna rajin damel pikeun indungna.",
    "Madura": "Paggun, Malin lo'ar badha ka kara' nyare kayu bakar. Ia rajin kerja demi èbuna.",
    "Makassar": "Pagi hari, Malin pergi ke hutan cari kayu bakar. Ia rajin bekerja demi menolong ibunya."
  },
  {
    "Indonesian": "Saat Malin kecil, ia sering membantu ibunya sampai ke pasar atau pulang membawa kayu bakar, ikan ataupun hasil kebun.",
    "Javanese": "Nalika Masih cilik, Malin kerep mbantu ibune nganti pasar utawa nggawa kayu bakar lan iwak bali.",
    "Bali": "Wawan ring yusa alit, Malin makarya tulus ngantosang ibuné ngalaksanayang ajengan ring pasar.",
    "Sundanes": "Waktu masih leutik, Malin sok nulungan indungna ka pasar jeung mawa kai atawa lauk.",
    "Madura": "Waktu cilik, Malin ongghu rajin ngabantu èbuna ngater hasil kayu أو ikan ka rumah.",
    "Makassar": "Saat kecil, Malin sering bantu ibunya ke pasar atau membawa hasil kebun dan ikan ke rumah."
  },
  {
    "Indonesian": "Suatu ketika, Malin pulang membawa hasil tangkapan yang banyak. Ibunya sangat bahagia karena bisa memasak makanan lebih enak untuk mereka berdua.",
    "Javanese": "Sakalikane, Malin bali nggawa iwak akeh. Ibune bungah banget amarga bisa masak enak kanggo Malin lan awake dewe.",
    "Bali": "Ring waktu puniki, Malin mulih nglaksanayang ajengan sane akeh. Ibuné prasida dados, dadosang ajengan becik.",
    "Sundanes": "Hiji waktu, Malin mulang jeung lauk loba keneh. Indungna bungah sabab bisa masak nikmat keur duaan.",
    "Madura": "Sato harè, Malin pulang bawa hasil tangkapan sè bhessah. Èbuna makmak bhantal ajhina bisa masak enak.",
    "Makassar": "Suatu saat, Malin pulang dengan banyak ikan. Ibunya sangat senang bisa masak enak untuk mereka."
  },
  {
    "Indonesian": "Hari demi hari mereka jalani bersama. Namun semakin lama Malin tumbuh menjadi pemuda yang tampan dan kuat. Ia mulai merasa harus mengubah nasib hidup mereka.",
    "Javanese": "Saben dina, Malin lan ibune bebarengan. Bareng Malin saya gede dadi nom tampan, ia rumangsa kudu ngowahi nasib urip keluargane.",
    "Bali": "Sasampun ring rahina, Malin dados dadosang pemuda. Ia ngidangangang upaya ngubah nasib iraga sareng ibuné.",
    "Sundanes": "Unggal poe, maranehna hirup susah babarengan. Ngan lila-lila, Malin jadi nonoman jangkung sarta hayang ngarobah kahirupan.",
    "Madura": "Hari-hari mereka jalani bareng. Malin makin dewasa, ajhina pengen ngubah nasib keluarga.",
    "Makassar": "Hari-hari berlalu bersama. Malin makin dewasa dan ingin mengubah nasib keluarga mereka."
  },
  {
    "Indonesian": "Suatu hari, datanglah sebuah kapal besar yang berlabuh di pantai. Ada pedagang dan pelaut dari negeri jauh yang menawarkan pekerjaan di kapal mereka.",
    "Javanese": "Dina siji, ana kapal gede nang pesisir. Para pedagang lan pelaut saka jauh nawarake kerjo nang kapale.",
    "Bali": "Ring warsa puniki, rawuh prahu ageng ring pesisir. Para pedagang lan pelaut nglaksanayang tawaran ngajengan ring kapal.",
    "Sundanes": "Hiji poe, kapal ageung datang ka basisir lembur. Nu ti luar negeri nawarkeun pagawean di kapal.",
    "Madura": "Sato harè, datang kapal bhessa e pesisir. Raja dagang ban nahkoda nawarin kerja e kapal.",
    "Makassar": "Suatu hari datang kapal besar di pantai. Ada pedagang dari jauh menawarkan kerja di kapal."
  },
  {
    "Indonesian": "Malin merasa inilah kesempatan untuk mengubah nasib. Ia menyampaikan niatnya kepada ibunya, meski ibunya berat melepas anak semata wayangnya.",
    "Javanese": "Malin rumangsa iki kesempatan ngowahi nasib. Ia ngandani ibune, sanajan ibune abot ngikhlase anak siji-sijine.",
    "Bali": "Malin ngidangangang menawi puniki tekenang maktaang iraga. Ia matur ring ibuné, ibuné takut ngantosangang anak tunggalna.",
    "Sundanes": "Malin ngarasa ieu kasempetan pikeun ngarobah nasib. Anjeunna nyaritakeun ka indungna, sanajan indungna sedih.",
    "Madura": "Malin ngerasa jiya kesempatan tor cerita ka èbuna, walau èbuna berat lepasa anak satèya.",
    "Makassar": "Malin yakin ini peluang besar. Ia bicara ke ibunya, walaupun ibunya berat hati melepas anaknya."
  },
  {
    "Indonesian": "Dengan berat hati, sang ibu akhirnya merelakan Malin pergi merantau. Ia membekali Malin dengan doa dan pesan agar selalu ingat kepada ibunya dan kampung halaman.",
    "Javanese": "Karo ati abot, ibune merelake Malin lunga merantau. Ia maringi bekal lan pesen supaya Malin eling ibune lan desa.",
    "Bali": "Mawarnganing rasan, ibuné iklasang Malin maktaang perantauan. Ia ngaturangang pesan sareng doa ring Malin.",
    "Sundanes": "Sanajan sedih, indungna ngikhlakeun Malin indit merantau. Indungna mere bekel jeung pesen supaya inget ka indung jeung lembur.",
    "Madura": "Dengan berat atè, èbuna ngikhlasang Malin berangkat. Èbuna makasè pesan supaya olo èbun rato kampong ta luppa.",
    "Makassar": "Dengan berat hati, ibunya rela Malin pergi. Ia memberi doa dan pesan: jangan lupa ibu dan kampung."
  },
  {
    "Indonesian": "Malin pun berangkat. Ia pamit dan memeluk ibunya di tepi pantai dengan air mata haru, berjanji akan kembali membawa kebahagiaan.",
    "Javanese": "Malin pamit lunga, ndakoni ibune nang pesisir karo nangis haru, janji bakal bali nggawa kamakmuran.",
    "Bali": "Malin pamitan, nyanggra ibuné ring pesisir, mabukaang ajengan mupuhang kabahagiaan.",
    "Sundanes": "Malin pamit ka indungna. Anjeunna mesem jeung nangis di basisir, jangji balik sanggeus jadi jalmi suksés.",
    "Madura": "Malin pamit rato peluk èbuna e pesisir, sambil nangis janji akan pulang bawa bahagia.",
    "Makassar": "Malin pamit berangkat, peluk ibunya di pantai, janji akan pulang membawa kebahagiaan."
  },
  {
    "Indonesian": "Ibu Malin menangis sedih melepas kepergian Malin. Setiap hari ia menunggu dan berdoa di tepi pantai agar anaknya selamat di negeri orang.",
    "Javanese": "Ibune Malin nangis sedhih nalika Malin lunga. Saben dina ngenteni lan ndonga nang pesisir supaya Malin slamet.",
    "Bali": "Ibuné Malin nangis melepas Malin pergi. Saking rahina ring pasisi ia nyantosang lan ndonga anake selamet.",
    "Sundanes": "Indungna Malin ceurik lirih ninggalkeun. Saban poé manéhna nunggu jeung ngadoa di basisir.",
    "Madura": "Èbuna Malin nangis pas Malin lebur. Tiap hari nunggu tor ngaddu'a e pesisir.",
    "Makassar": "Ibunya menangis sedih. Tiap hari ia menunggu dan berdoa di pantai, semoga anaknya selamat."
  },
  {
    "Indonesian": "Sementara itu Malin bekerja sangat keras di kapal. Ia belajar berdagang, mengenal banyak tempat, hingga akhirnya menjadi saudagar kaya.",
    "Javanese": "Sakwisé lunga, Malin kerja keras nang kapal. Sinau dagang, kenal akèh pelabuhan, nganti dadi pedagang sugih.",
    "Bali": "Ring perantauan, Malin makarya angel ring kapal. Ia sinau dagang ring pasar, suksma dados padagang sane sugih.",
    "Sundanes": "Di perantauan, Malin damel pageuh di kapal, diajar dagang, neuleuman loba tempat, antuk jadi padagang beunghar.",
    "Madura": "Di perantauan Malin kerja keras di kapal, belajar dagang sampai akherah menjadi padagang sugih.",
    "Makassar": "Malin kerja keras di kapal, belajar berdagang, mengenal banyak tempat hingga jadi saudagar kaya."
  },
  {
    "Indonesian": "Malin menikah dengan putri saudagar kaya. Ia lupa dengan ibunya dan kampung halamannya. Ibunya semakin tua dan tetap menanti kepulangan anaknya.",
    "Javanese": "Malin nikah karo anak saudagar sugih, lali ibune lan desa. Ibune saya tuwa nanging tetep ngenteni Malin bali.",
    "Bali": "Malin makanten ring anak saudagar sane sugih, sané lali ring ibuné sareng desa. Ibuné prasida dados sepuh, nenten lali nyantosang Malin.",
    "Sundanes": "Malin nikah jeung putri padagang beunghar, poho ka indung jeung lembur. Indungna beuki sepuh, tetep nungguan anakna.",
    "Madura": "Malin kawin rato anak padagang sugih, la'abbhu luppa èbuna. Èbuna makin sepoh, tetap nunggu Malin pulang.",
    "Makassar": "Malin menikahi putri saudagar kaya. Ia lupa pada ibu dan kampungnya. Ibunya makin tua tetap menunggu Malin pulang."
  },
  {
    "Indonesian": "Suatu hari kapal mewah Malin Kundang berlabuh di desa lamanya. Penyambutan meriah dilakukan, dan orang kampung kagum melihat Malin yang sukses dan kaya.",
    "Javanese": "Sak dina, kapal Malin Kundang teko nang desa lawas. Warga padha nyambut gayeng, kagum ndeleng Malin sing wis sukses.",
    "Bali": "Ring rahina puniki, prahu agung Malin Kundang mapinton ring desa sane kapanggihin. Jerone sami kagum ring Malin.",
    "Sundanes": "Hiji waktu kapal Malin datang ka lemburna. Sakabéh urang kagum ningali Malin nu geus jadi sugih.",
    "Madura": "Satu harè kapal Malin Kundang sandar e kampong. Orèng kampong kagum ninggal Malin sukses.",
    "Makassar": "Satu hari kapal mewah Malin Kundang sandar di kampung lamanya. Orang-orang kampung kagum dan menyambut."
  },
  {
    "Indonesian": "Ibunya yang sudah tua terpincang-pincang mendatangi Malin lalu memanggil-manggil namanya dengan bangga dan penuh haru.",
    "Javanese": "Ibune sing wis tuwa lungguh alon-alon, nyedhak Malin lan mbengok jenenge karo bangga lan trenyuh.",
    "Bali": "Ibuné sane sampun tua ngalantur ring Malin, maktaang rasa bangga sareng haru.",
    "Sundanes": "Indungna nu geus sepuh ngurilingan Malin, nyarita jeung ngabagjakeun barudak lembur.",
    "Madura": "Èbuna sè sepoh mendekat, manggil Malin kalaben rasan bangga tor haru.",
    "Makassar": "Ibunya yang sudah tua mendekati Malin dengan langkah berat, memanggil namanya penuh haru dan bangga."
  },
  {
    "Indonesian": "Malin yang malu pada istri dan para awak kapal pura-pura tidak mengenal ibunya. Malin bahkan menghardik dan mengusir ibunya.",
    "Javanese": "Malin isin ing ngarepe bojone lan awak kapal, pura-pura ora kenal ibune. Malah ngusir ibune saka kana.",
    "Bali": "Malin isin ngajengang garwane lan kru kapal, nenten ngaku ibuné sareng lingsir lanang ibuné.",
    "Sundanes": "Malin isin ka pamajikan jeung sakabéh panumpang kapal, nolak jeung teu ngaku indungna.",
    "Madura": "Malin isin sangkol bini rato orèng kapal, ngusir èbuna maktak kenalna.",
    "Makassar": "Malin malu di depan istrinya dan kru kapal, pura-pura tidak kenal ibunya, lalu mengusir dengan kasar."
  },
  {
    "Indonesian": "Ibunya sangat sedih dan marah. Dengan linangan air mata, ia berdoa agar Malin mendapat balasan atas perbuatannya.",
    "Javanese": "Ibune banget sedhih lan nesu. Karo nangis, ia ndedonga supaya Malin nampa balasan.",
    "Bali": "Ibuné sanget ngerasa sedih sareng murka. Ia mepeken panyunan sane abot ring Hyang Widhi.",
    "Sundanes": "Indungna kacida sedih jeung ambekna, tuluy ngadoa ka Gusti.",
    "Madura": "Èbuna sangat kecewa dan sedih, sambil nangis ngaddu'a supaya Malin dapat balasan.",
    "Makassar": "Ibunya sangat sedih dan marah. Sambil menangis, ia berdoa Malin mendapat hukuman."
  },
  {
    "Indonesian": "Langit tiba-tiba mendung. Petir menyambar dan badai besar datang menghantam kapal Malin.",
    "Javanese": "Langit medhung, petir sambar-sambar lan badai amuk nabrak kapal Malin.",
    "Bali": "Langit ngawarnaang peteng. Kilat sareng badai gede datang nyerang kapal Malin.",
    "Sundanes": "Langit jadi mendung, petir jeung hujan gede ngapeurih kapal Malin.",
    "Madura": "Langit peteng, kilat rato badai gede menget kapal Malin.",
    "Makassar": "Langit mendung, petir dan badai hebat menghantam kapal Malin."
  },
  {
    "Indonesian": "Kapal Malin pecah diterjang ombak dan petir. Para penumpang panik dan berlarian mencari keselamatan.",
    "Javanese": "Kapal Malin pecah kebanjur ombak lan petir. Kabeh penumpang wedi lan golek slamet.",
    "Bali": "Kapal Malin pun dados rubuh ring ombak lan kilat ageng. Sami penumpang panik ring kapal.",
    "Sundanes": "Kapal Malin pegat dihantam badai jeung ombak, panumpang kabur.",
    "Madura": "Kapal Malin pecah kena ombak tor kilat, penumpang pada panik.",
    "Makassar": "Kapal Malin pecah dihantam ombak dan petir, semua penumpang panik berlarian."
  },
  {
    "Indonesian": "Malin berusaha lari ke tepi pantai, namun tubuhnya tiba-tiba mulai mengeras dan berubah menjadi batu.",
    "Javanese": "Malin nyoba mlayu menyang pesisir, nanging awaké mendadak atos lan malih dadi watu.",
    "Bali": "Malin ngudi ngungsian ring pesisir, nanging awakne ngajantenang batu secara perlahan.",
    "Sundanes": "Malin narékahan nepi ka basisir, tapi awakna ngadadak jadi batu.",
    "Madura": "Malin coba lari ke pesisir tapi badanna langsung membatu.",
    "Makassar": "Malin berusaha lari ke pantai, tapi tubuhnya mulai membatu pelan-pelan."
  },
  {
    "Indonesian": "Malin Kundang akhirnya menjadi batu di tepi pantai, sebagai kutukan atas kedurhakaannya kepada sang ibu.",
    "Javanese": "Akhire, Malin Kundang dadi watu ing pinggir pantai, dadi kutukan amarga durhaka marang ibune.",
    "Bali": "Malin Kundang ring pungkasan dados batu ring pasisi dados kutukan naenin labda sang ibuné.",
    "Sundanes": "Tungtungna Malin robah jadi batu di basisir, sabab kutukan indungna.",
    "Madura": "Akhiren Malin Kundang jadi batu e pesisir, kutukan tak hormat ka èbuna.",
    "Makassar": "Akhirnya Malin Kundang berubah jadi batu di pantai, sebagai kutukan ibu karena kedurahaan Malin."
  }
]
const Pane = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
  img21,
  img22,
  img23,
  img24,
];


const languages = [
  { code: 'jawa', name: 'Jawa' },
  { code: 'sunda', name: 'Sunda' },
  { code: 'bali', name: 'Bali' },
  { code: 'madura', name: 'Madura' },
  { code: 'makasar', name: 'Makasar' },
];
// --- End of Placeholder Data ---




function MalinKundang() {
  const [currentPane, setCurrentPane] = useState(0);
  const [selectedLang, setSelectedLang] = useState('jawa');
  const [storyContent, setStoryContent] = useState(storyData[selectedLang]);
  const [listOfCaption, setlistOfCaption] = useState([]);
  const handleNext = useCallback(() => {
    setCurrentPane(prevPane => (prevPane + 1) % Pane.length);
  }, []);

  const handlePrev = () => {
    setCurrentPane(prevPane => (prevPane - 1 + Pane.length) % Pane.length);
  };


  const langMap = {
    jawa: 'Javanese',
    sunda: 'Sundanes',
    bali: 'Bali',
    madura: 'Madura',
    makasar: 'Makassar',
  };


  useEffect(() => {
    setStoryContent(storyData[selectedLang]);
    setCurrentPane(0);
  }, [selectedLang]);

  const handleLanguageChange = (event) => {
    const selected = event.target.value;
    setSelectedLang(selected);

    const langKey = langMap[selected];

    if (langKey && realScript.every(item => langKey in item)) {
      const captions = realScript.map(item => item[langKey]);
      setlistOfCaption(captions);
    } else {
      console.warn(`Language key '${langKey}' not found in realScript`);
      setlistOfCaption([]);
    }
  };

  // Run handleLanguageChange logic once on load
  useEffect(() => {
    const langKey = langMap[selectedLang];
    if (langKey && realScript.every(item => langKey in item)) {
      const captions = realScript.map(item => item[langKey]);
      setlistOfCaption(captions);
    } else {
      setlistOfCaption([]);
    }
  }, []);

  // Log updated listOfCaption when it changes
  useEffect(() => {
    console.log(listOfCaption);
  }, [listOfCaption]);
  
  // BALI = ("bali", "./saved_model/bali")
  //   JAVA = ("java", "./saved_model/java")
  //   MADURA = ("madura", "./saved_model/madura")
  //   MAKASAR = ("makasar", "./saved_model/makasar")
  //   SUNDA = ("sunda", "./saved_model/sunda")
  const handlePlayAudio = async () => {
    const LANG_ENUM = {
      bali: "bali",
      jawa: "java",
      madura: "madura",
      makasar: "makasar",
      sunda: "sunda"
    };

    const lang = LANG_ENUM[selectedLang];
    const text = listOfCaption[currentPane];
    const apiUrl = import.meta.env.VITE_BE_API;
    const response = await axios.post(`${apiUrl}/quiz/tts`, { lang, text });

    if (response.status === 200 && response.data.url) {
      const audioUrl = response.data.url;  // The URL returned by your API
      console.log(`Playing audio from: ${audioUrl}`);

      // Play the audio
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      console.error('Failed to get audio URL from TTS API');
    }
  };

  return (
    <div className="storyboard-container">
      <Link to="/cerita-rakyat" className="back-arrow-story">&#x2190;</Link>
      
      <div className="top-right-controls">
        <button onClick={handlePlayAudio} className="speaker-button" aria-label="Play audio">
          &#128266;
        </button>
        <div className="language-selector">
          <select value={selectedLang} onChange={handleLanguageChange}>
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="storyboard-main">
        <div className="storyboard-interactive-image">
          <button onClick={handlePrev} className="btn-arrow btn-arrow-left" aria-label="Previous scene"></button>
          <div className="storyboard-image-container">
            <img 
              key={Pane[currentPane]}
              src={Pane[currentPane]} 
              alt="Storyboard scene" 
              className="storyboard-image"
            />
          </div>
          <button onClick={handleNext} className="btn-arrow btn-arrow-right" aria-label="Next scene"></button>
        </div>
        <div className="storyboard-subtitle-container">
          <p className="storyboard-subtitle">
            {listOfCaption[currentPane]}
          </p>
        </div>
      </div>
      
    </div>
  );
}

export default MalinKundang;