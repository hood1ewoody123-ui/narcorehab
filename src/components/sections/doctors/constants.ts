export type DoctorGroup = "clinic" | "center";

export type DoctorSlot = {
  top: string;
  left: string;
  size: number;
};

export type Doctor = {
  id: string;
  name: string;
  title: string;
  imageSrc: string;
  group: DoctorGroup;
  slot: DoctorSlot;
};

export const DOCTORS_TITLE =
  "С вами будут рядом специалисты разных профилей";

export const DOCTORS_TABS: { id: DoctorGroup; label: string }[] = [
  { id: "clinic", label: "Врачи клиники" },
  { id: "center", label: "Специалисты центра" },
];

export const DOCTORS_SEE_ALL_LABEL = "Увидеть всех врачей";
export const DOCTORS_SEE_ALL_HREF = "/vrachi";

export const DOCTORS_CTA_SLOT: DoctorSlot = {
  top: "33%",
  left: "54%",
  size: 188,
};

/** Раскладка врачей клиники — один в один со скрином */
const CLINIC_SLOTS = {
  terekhov: { top: "0%", left: "40%", size: 180 },
  terekhova: { top: "6%", left: "76%", size: 172 },
  kostrigin: { top: "24%", left: "0%", size: 186 },
  paramonova: { top: "36%", left: "22%", size: 168 },
  varlaganova: { top: "62%", left: "8%", size: 176 },
  razorenkov: { top: "66%", left: "40%", size: 172 },
  gening: { top: "58%", left: "78%", size: 180 },
} as const satisfies Record<string, DoctorSlot>;

/** Раскладка специалистов центра — та же сетка */
const CENTER_SLOTS = {
  kosheleva: { top: "0%", left: "36%", size: 180 },
  knobloh: { top: "6%", left: "76%", size: 172 },
  kalaidzhyan: { top: "24%", left: "2%", size: 186 },
  kuleshova: { top: "36%", left: "24%", size: 168 },
  krestova: { top: "62%", left: "10%", size: 176 },
  altyntseva: { top: "66%", left: "38%", size: 172 },
  kolesnikova: { top: "58%", left: "78%", size: 180 },
} as const satisfies Record<string, DoctorSlot>;

export const DOCTORS: Doctor[] = [
  // ——— Врачи клиники (7 человек) ———
  {
    id: "terekhov-vasily",
    name: "Терехов Василий Станиславович",
    title: "Специалист по социальной работе",
    imageSrc: "/images/doctors/terekhov-vasily.png",
    group: "clinic",
    slot: CLINIC_SLOTS.terekhov,
  },
  {
    id: "terekhova-anna",
    name: "Терехова Анна Владимировна",
    title: "Клинический психолог, квалификации магистр",
    imageSrc: "/images/doctors/terekhova-anna.png",
    group: "clinic",
    slot: CLINIC_SLOTS.terekhova,
  },
  {
    id: "kostrigin-veniamin",
    name: "Костригин Вениамин Александрович",
    title: "Клинический психолог",
    imageSrc: "/images/doctors/kostrigin-veniamin.png",
    group: "clinic",
    slot: CLINIC_SLOTS.kostrigin,
  },
  {
    id: "paramonova-olga",
    name: "Парамонова Ольга",
    title: "Врач клиники",
    imageSrc: "/images/doctors/paramonova-olga.png",
    group: "clinic",
    slot: CLINIC_SLOTS.paramonova,
  },
  {
    id: "varlaganova-ekaterina",
    name: "Варлаганова Екатерина Александровна",
    title: "Врач психиатр-нарколог",
    imageSrc: "/images/doctors/varlaganova-ekaterina.png",
    group: "clinic",
    slot: CLINIC_SLOTS.varlaganova,
  },
  {
    id: "razorenkov-dmitry",
    name: "Разоренков Дмитрий Валерьевич",
    title: "Специалист по социальной работе, психолог",
    imageSrc: "/images/doctors/razorenkov-dmitry.png",
    group: "clinic",
    slot: CLINIC_SLOTS.razorenkov,
  },
  {
    id: "gening-anna",
    name: "Генинг Анна Савельевна",
    title: "Врач-психиатр, врач-нарколог",
    imageSrc: "/images/doctors/gening-anna.png",
    group: "clinic",
    slot: CLINIC_SLOTS.gening,
  },

  // ——— Специалисты центра (остальные) ———
  {
    id: "kosheleva-tatyana",
    name: "Кошелева Татьяна Станиславовна",
    title:
      "Психиатр, психотерапевт, психиатр-нарколог высшей категории, к.м.н.",
    imageSrc: "/images/doctors/kosheleva-tatyana.png",
    group: "center",
    slot: CENTER_SLOTS.kosheleva,
  },
  {
    id: "knobloh-ekaterina",
    name: "Кноблох Екатерина Сергеевна",
    title: "Клинический психолог",
    imageSrc: "/images/doctors/knobloh-ekaterina.png",
    group: "center",
    slot: CENTER_SLOTS.knobloh,
  },
  {
    id: "kalaidzhyan-kristina",
    name: "Калайджян Кристина Ервандовна",
    title: "Клинический психолог",
    imageSrc: "/images/doctors/kalaidzhyan-kristina.png",
    group: "center",
    slot: CENTER_SLOTS.kalaidzhyan,
  },
  {
    id: "kuleshova-evgeniya",
    name: "Кулешова Евгения Геннадьевна",
    title: "Клинический психолог",
    imageSrc: "/images/doctors/kuleshova-evgeniya.png",
    group: "center",
    slot: CENTER_SLOTS.kuleshova,
  },
  {
    id: "krestova-olga",
    name: "Крестова Ольга Алексеевна",
    title: "Клинический психолог, сексолог",
    imageSrc: "/images/doctors/krestova-olga.png",
    group: "center",
    slot: CENTER_SLOTS.krestova,
  },
  {
    id: "altyntseva-irina",
    name: "Алтынцева Ирина Константиновна",
    title: "Медицинский психолог",
    imageSrc: "/images/doctors/altyntseva-irina.png",
    group: "center",
    slot: CENTER_SLOTS.altyntseva,
  },
  {
    id: "kolesnikova-oksana",
    name: "Колесникова Оксана Николаевна",
    title: "Психолог-педагог",
    imageSrc: "/images/doctors/kolesnikova-oksana.png",
    group: "center",
    slot: CENTER_SLOTS.kolesnikova,
  },
];

export function getDoctorsByGroup(group: DoctorGroup) {
  return DOCTORS.filter((doctor) => doctor.group === group);
}
