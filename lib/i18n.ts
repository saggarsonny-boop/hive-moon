export const LANG_KEY = 'hive_lang'

export function getLang(): string {
  if (typeof window === 'undefined') return 'en'
  return localStorage.getItem(LANG_KEY) || 'en'
}

export type Strings = {
  // Page chrome
  title: string
  subtitle: string
  loading: string
  readingTheSky: string

  // Phase names
  newMoon: string
  waxingCrescent: string
  firstQuarter: string
  waxingGibbous: string
  fullMoon: string
  waningGibbous: string
  lastQuarter: string
  waningCrescent: string

  // Moon stats
  illuminated: string
  daysOld: string
  supermoon: string
  micromoon: string

  // Upcoming events
  nextFullMoon: string
  nextNewMoon: string
  tomorrow: string
  today: string
  in_n_days: string   // template: {n}
  days: string
  hours: string
  minutes: string

  // Units
  km: string
  percent: string

  // Logger / stats
  daysLogged: string
  to90Days: string
  portraitReady: string
  daysToPortrait: string
  recentLogs: string
  moodLabel: string    // "Mood"
  energyLabel: string  // "Energy"
  startLogging: string

  // Lunar portrait
  yourLunarPortrait: string
  portraitUnlocksAfter: string
  peakPhase: string
  avgMood: string
  cycles: string
  sharePortrait: string

  // Welcome card
  welcomeQuestion: string
  welcomeBody: string
  welcomeHint: string

  // Powered by
  poweredBy: string
}

type TranslationMap = Record<string, Strings>

const translations: TranslationMap = {
  en: {
    title: 'HiveMoon',
    subtitle: 'Does the moon affect you?',
    loading: 'Loading…',
    readingTheSky: 'Reading the sky…',
    newMoon: 'New Moon',
    waxingCrescent: 'Waxing Crescent',
    firstQuarter: 'First Quarter',
    waxingGibbous: 'Waxing Gibbous',
    fullMoon: 'Full Moon',
    waningGibbous: 'Waning Gibbous',
    lastQuarter: 'Last Quarter',
    waningCrescent: 'Waning Crescent',
    illuminated: 'illuminated',
    daysOld: 'days old',
    supermoon: 'Supermoon',
    micromoon: 'Micromoon',
    nextFullMoon: 'Next Full Moon',
    nextNewMoon: 'Next New Moon',
    tomorrow: 'tomorrow',
    today: 'today',
    in_n_days: 'in {n} days',
    days: 'days',
    hours: 'hours',
    minutes: 'minutes',
    km: 'km',
    percent: '%',
    daysLogged: 'days logged',
    to90Days: 'to 90 days',
    portraitReady: 'portrait ready',
    daysToPortrait: 'days to portrait',
    recentLogs: 'Recent logs',
    moodLabel: 'Mood',
    energyLabel: 'Energy',
    startLogging: 'Start logging →',
    yourLunarPortrait: 'Your lunar portrait',
    portraitUnlocksAfter: 'Your portrait unlocks after 14 days of logging.',
    peakPhase: 'Peak phase',
    avgMood: 'Avg mood',
    cycles: 'Cycles',
    sharePortrait: 'Share portrait',
    welcomeQuestion: 'Does the moon affect you?',
    welcomeBody: 'Log mood and energy each day. Find out.',
    welcomeHint: 'Tap 1–5 for mood · 1–5 for energy · done in 2 seconds',
    poweredBy: 'Powered by Hive',
  },

  ar: {
    title: 'هايف مون',
    subtitle: 'هل يؤثر عليك القمر؟',
    loading: 'جارٍ التحميل…',
    readingTheSky: 'قراءة السماء…',
    newMoon: 'محاق',
    waxingCrescent: 'هلال متصاعد',
    firstQuarter: 'التربيع الأول',
    waxingGibbous: 'أحدب متصاعد',
    fullMoon: 'بدر',
    waningGibbous: 'أحدب متناقص',
    lastQuarter: 'التربيع الأخير',
    waningCrescent: 'هلال متناقص',
    illuminated: 'مضاء',
    daysOld: 'أيام عمر',
    supermoon: 'قمر عملاق',
    micromoon: 'قمر صغير',
    nextFullMoon: 'البدر القادم',
    nextNewMoon: 'المحاق القادم',
    tomorrow: 'غداً',
    today: 'اليوم',
    in_n_days: 'خلال {n} أيام',
    days: 'أيام',
    hours: 'ساعات',
    minutes: 'دقائق',
    km: 'كم',
    percent: '٪',
    daysLogged: 'أيام مسجلة',
    to90Days: 'إلى 90 يوماً',
    portraitReady: 'البورتريه جاهز',
    daysToPortrait: 'يوم للبورتريه',
    recentLogs: 'السجلات الأخيرة',
    moodLabel: 'المزاج',
    energyLabel: 'الطاقة',
    startLogging: 'ابدأ التسجيل ←',
    yourLunarPortrait: 'بورتريهك القمري',
    portraitUnlocksAfter: 'يُفتح البورتريه بعد 14 يوم من التسجيل.',
    peakPhase: 'المرحلة الذروة',
    avgMood: 'متوسط المزاج',
    cycles: 'الدورات',
    sharePortrait: 'شارك البورتريه',
    welcomeQuestion: 'هل يؤثر عليك القمر؟',
    welcomeBody: 'سجّل مزاجك وطاقتك كل يوم. اكتشف الحقيقة.',
    welcomeHint: 'اضغط 1–5 للمزاج · 1–5 للطاقة · في ثانيتين',
    poweredBy: 'مشغّل بواسطة هايف',
  },

  fr: {
    title: 'HiveMoon',
    subtitle: 'La lune vous affecte-t-elle?',
    loading: 'Chargement…',
    readingTheSky: 'Lecture du ciel…',
    newMoon: 'Nouvelle Lune',
    waxingCrescent: 'Croissant croissant',
    firstQuarter: 'Premier Quartier',
    waxingGibbous: 'Gibbeuse croissante',
    fullMoon: 'Pleine Lune',
    waningGibbous: 'Gibbeuse décroissante',
    lastQuarter: 'Dernier Quartier',
    waningCrescent: 'Croissant décroissant',
    illuminated: 'illuminée',
    daysOld: 'jours',
    supermoon: 'Superlune',
    micromoon: 'Microlune',
    nextFullMoon: 'Prochaine Pleine Lune',
    nextNewMoon: 'Prochaine Nouvelle Lune',
    tomorrow: 'demain',
    today: "aujourd'hui",
    in_n_days: 'dans {n} jours',
    days: 'jours',
    hours: 'heures',
    minutes: 'minutes',
    km: 'km',
    percent: '%',
    daysLogged: 'jours enregistrés',
    to90Days: 'vers 90 jours',
    portraitReady: 'portrait prêt',
    daysToPortrait: 'jours pour le portrait',
    recentLogs: 'Journaux récents',
    moodLabel: 'Humeur',
    energyLabel: 'Énergie',
    startLogging: 'Commencer →',
    yourLunarPortrait: 'Votre portrait lunaire',
    portraitUnlocksAfter: 'Votre portrait se débloque après 14 jours.',
    peakPhase: 'Phase de pointe',
    avgMood: 'Humeur moy.',
    cycles: 'Cycles',
    sharePortrait: 'Partager le portrait',
    welcomeQuestion: 'La lune vous affecte-t-elle?',
    welcomeBody: 'Notez humeur et énergie chaque jour. Découvrez.',
    welcomeHint: 'Appuyez 1–5 humeur · 1–5 énergie · en 2 secondes',
    poweredBy: 'Propulsé par Hive',
  },

  es: {
    title: 'HiveMoon',
    subtitle: '¿La luna te afecta?',
    loading: 'Cargando…',
    readingTheSky: 'Leyendo el cielo…',
    newMoon: 'Luna Nueva',
    waxingCrescent: 'Cuarto Creciente',
    firstQuarter: 'Cuarto Creciente',
    waxingGibbous: 'Gibosa Creciente',
    fullMoon: 'Luna Llena',
    waningGibbous: 'Gibosa Menguante',
    lastQuarter: 'Cuarto Menguante',
    waningCrescent: 'Luna Menguante',
    illuminated: 'iluminada',
    daysOld: 'días',
    supermoon: 'Superluna',
    micromoon: 'Microluna',
    nextFullMoon: 'Próxima Luna Llena',
    nextNewMoon: 'Próxima Luna Nueva',
    tomorrow: 'mañana',
    today: 'hoy',
    in_n_days: 'en {n} días',
    days: 'días',
    hours: 'horas',
    minutes: 'minutos',
    km: 'km',
    percent: '%',
    daysLogged: 'días registrados',
    to90Days: 'hacia 90 días',
    portraitReady: 'retrato listo',
    daysToPortrait: 'días para el retrato',
    recentLogs: 'Registros recientes',
    moodLabel: 'Ánimo',
    energyLabel: 'Energía',
    startLogging: 'Comenzar →',
    yourLunarPortrait: 'Tu retrato lunar',
    portraitUnlocksAfter: 'Tu retrato se desbloquea después de 14 días.',
    peakPhase: 'Fase pico',
    avgMood: 'Ánimo medio',
    cycles: 'Ciclos',
    sharePortrait: 'Compartir retrato',
    welcomeQuestion: '¿La luna te afecta?',
    welcomeBody: 'Registra humor y energía cada día. Descúbrelo.',
    welcomeHint: 'Pulsa 1–5 para ánimo · 1–5 para energía · en 2 segundos',
    poweredBy: 'Desarrollado por Hive',
  },

  de: {
    title: 'HiveMoon',
    subtitle: 'Beeinflusst dich der Mond?',
    loading: 'Lädt…',
    readingTheSky: 'Himmel wird gelesen…',
    newMoon: 'Neumond',
    waxingCrescent: 'Zunehmende Sichel',
    firstQuarter: 'Erstes Viertel',
    waxingGibbous: 'Zunehmender Gibbous',
    fullMoon: 'Vollmond',
    waningGibbous: 'Abnehmender Gibbous',
    lastQuarter: 'Letztes Viertel',
    waningCrescent: 'Abnehmende Sichel',
    illuminated: 'beleuchtet',
    daysOld: 'Tage alt',
    supermoon: 'Supermond',
    micromoon: 'Mikromond',
    nextFullMoon: 'Nächster Vollmond',
    nextNewMoon: 'Nächster Neumond',
    tomorrow: 'morgen',
    today: 'heute',
    in_n_days: 'in {n} Tagen',
    days: 'Tage',
    hours: 'Stunden',
    minutes: 'Minuten',
    km: 'km',
    percent: '%',
    daysLogged: 'Tage protokolliert',
    to90Days: 'bis 90 Tage',
    portraitReady: 'Porträt bereit',
    daysToPortrait: 'Tage bis Porträt',
    recentLogs: 'Aktuelle Einträge',
    moodLabel: 'Stimmung',
    energyLabel: 'Energie',
    startLogging: 'Beginnen →',
    yourLunarPortrait: 'Dein Mondporträt',
    portraitUnlocksAfter: 'Dein Porträt wird nach 14 Tagen freigeschaltet.',
    peakPhase: 'Höchstphase',
    avgMood: 'Ø Stimmung',
    cycles: 'Zyklen',
    sharePortrait: 'Porträt teilen',
    welcomeQuestion: 'Beeinflusst dich der Mond?',
    welcomeBody: 'Protokolliere täglich Stimmung und Energie. Finde es heraus.',
    welcomeHint: '1–5 Stimmung · 1–5 Energie · fertig in 2 Sekunden',
    poweredBy: 'Powered by Hive',
  },

  zh: {
    title: 'HiveMoon',
    subtitle: '月亮影响你吗？',
    loading: '加载中…',
    readingTheSky: '正在读取星空…',
    newMoon: '新月',
    waxingCrescent: '蛾眉月',
    firstQuarter: '上弦月',
    waxingGibbous: '盈凸月',
    fullMoon: '满月',
    waningGibbous: '亏凸月',
    lastQuarter: '下弦月',
    waningCrescent: '残月',
    illuminated: '照亮',
    daysOld: '天',
    supermoon: '超级月亮',
    micromoon: '微型月亮',
    nextFullMoon: '下次满月',
    nextNewMoon: '下次新月',
    tomorrow: '明天',
    today: '今天',
    in_n_days: '{n}天后',
    days: '天',
    hours: '小时',
    minutes: '分钟',
    km: '千米',
    percent: '%',
    daysLogged: '天已记录',
    to90Days: '到90天',
    portraitReady: '月相画像已就绪',
    daysToPortrait: '天后获得画像',
    recentLogs: '近期记录',
    moodLabel: '心情',
    energyLabel: '能量',
    startLogging: '开始记录 →',
    yourLunarPortrait: '你的月相画像',
    portraitUnlocksAfter: '记录14天后解锁画像。',
    peakPhase: '巅峰月相',
    avgMood: '平均心情',
    cycles: '周期',
    sharePortrait: '分享画像',
    welcomeQuestion: '月亮影响你吗？',
    welcomeBody: '每天记录心情和能量，探索答案。',
    welcomeHint: '心情1–5 · 能量1–5 · 2秒完成',
    poweredBy: 'Hive 提供支持',
  },

  ja: {
    title: 'HiveMoon',
    subtitle: '月があなたに影響を与えていますか？',
    loading: '読み込み中…',
    readingTheSky: '空を読んでいます…',
    newMoon: '新月',
    waxingCrescent: '三日月',
    firstQuarter: '上弦の月',
    waxingGibbous: '十三夜月',
    fullMoon: '満月',
    waningGibbous: '十六夜',
    lastQuarter: '下弦の月',
    waningCrescent: '有明月',
    illuminated: '照らされた',
    daysOld: '日',
    supermoon: 'スーパームーン',
    micromoon: 'マイクロムーン',
    nextFullMoon: '次の満月',
    nextNewMoon: '次の新月',
    tomorrow: '明日',
    today: '今日',
    in_n_days: '{n}日後',
    days: '日',
    hours: '時間',
    minutes: '分',
    km: 'km',
    percent: '%',
    daysLogged: '日記録済み',
    to90Days: '90日まで',
    portraitReady: 'ポートレート完成',
    daysToPortrait: '日でポートレート',
    recentLogs: '最近のログ',
    moodLabel: '気分',
    energyLabel: 'エネルギー',
    startLogging: '記録を始める →',
    yourLunarPortrait: 'あなたの月のポートレート',
    portraitUnlocksAfter: '14日間記録するとポートレートが開放されます。',
    peakPhase: 'ピーク月相',
    avgMood: '平均気分',
    cycles: 'サイクル',
    sharePortrait: 'ポートレートを共有',
    welcomeQuestion: '月があなたに影響を与えていますか？',
    welcomeBody: '毎日気分とエネルギーを記録して確かめましょう。',
    welcomeHint: '気分1〜5 · エネルギー1〜5 · 2秒で完了',
    poweredBy: 'Hive による',
  },

  pt: {
    title: 'HiveMoon',
    subtitle: 'A lua te afeta?',
    loading: 'Carregando…',
    readingTheSky: 'Lendo o céu…',
    newMoon: 'Lua Nova',
    waxingCrescent: 'Lua Crescente',
    firstQuarter: 'Quarto Crescente',
    waxingGibbous: 'Gibosa Crescente',
    fullMoon: 'Lua Cheia',
    waningGibbous: 'Gibosa Minguante',
    lastQuarter: 'Quarto Minguante',
    waningCrescent: 'Lua Minguante',
    illuminated: 'iluminada',
    daysOld: 'dias',
    supermoon: 'Superlua',
    micromoon: 'Microlua',
    nextFullMoon: 'Próxima Lua Cheia',
    nextNewMoon: 'Próxima Lua Nova',
    tomorrow: 'amanhã',
    today: 'hoje',
    in_n_days: 'em {n} dias',
    days: 'dias',
    hours: 'horas',
    minutes: 'minutos',
    km: 'km',
    percent: '%',
    daysLogged: 'dias registados',
    to90Days: 'para 90 dias',
    portraitReady: 'retrato pronto',
    daysToPortrait: 'dias para o retrato',
    recentLogs: 'Registos recentes',
    moodLabel: 'Humor',
    energyLabel: 'Energia',
    startLogging: 'Começar →',
    yourLunarPortrait: 'O teu retrato lunar',
    portraitUnlocksAfter: 'O teu retrato fica disponível após 14 dias.',
    peakPhase: 'Fase de pico',
    avgMood: 'Humor médio',
    cycles: 'Ciclos',
    sharePortrait: 'Partilhar retrato',
    welcomeQuestion: 'A lua te afeta?',
    welcomeBody: 'Regista humor e energia cada dia. Descobre.',
    welcomeHint: 'Toca 1–5 humor · 1–5 energia · pronto em 2 segundos',
    poweredBy: 'Desenvolvido por Hive',
  },

  hi: {
    title: 'HiveMoon',
    subtitle: 'क्या चाँद आपको प्रभावित करता है?',
    loading: 'लोड हो रहा है…',
    readingTheSky: 'आकाश पढ़ा जा रहा है…',
    newMoon: 'अमावस्या',
    waxingCrescent: 'शुक्ल द्वितीया',
    firstQuarter: 'अष्टमी (शुक्ल पक्ष)',
    waxingGibbous: 'शुक्ल पक्ष',
    fullMoon: 'पूर्णिमा',
    waningGibbous: 'कृष्ण पक्ष',
    lastQuarter: 'अष्टमी (कृष्ण पक्ष)',
    waningCrescent: 'कृष्ण चतुर्दशी',
    illuminated: 'प्रकाशित',
    daysOld: 'दिन पुराना',
    supermoon: 'सुपरमून',
    micromoon: 'माइक्रोमून',
    nextFullMoon: 'अगली पूर्णिमा',
    nextNewMoon: 'अगली अमावस्या',
    tomorrow: 'कल',
    today: 'आज',
    in_n_days: '{n} दिनों में',
    days: 'दिन',
    hours: 'घंटे',
    minutes: 'मिनट',
    km: 'किमी',
    percent: '%',
    daysLogged: 'दिन दर्ज',
    to90Days: '90 दिन तक',
    portraitReady: 'चित्र तैयार',
    daysToPortrait: 'दिन चित्र तक',
    recentLogs: 'हाल के लॉग',
    moodLabel: 'मनोदशा',
    energyLabel: 'ऊर्जा',
    startLogging: 'दर्ज करना शुरू करें →',
    yourLunarPortrait: 'आपका चाँद-चित्र',
    portraitUnlocksAfter: '14 दिन दर्ज करने के बाद चित्र खुलेगा।',
    peakPhase: 'शीर्ष तिथि',
    avgMood: 'औसत मनोदशा',
    cycles: 'चक्र',
    sharePortrait: 'चित्र साझा करें',
    welcomeQuestion: 'क्या चाँद आपको प्रभावित करता है?',
    welcomeBody: 'हर दिन मनोदशा और ऊर्जा दर्ज करें। पता लगाएं।',
    welcomeHint: '1–5 मनोदशा · 1–5 ऊर्जा · 2 सेकंड में पूरा',
    poweredBy: 'Hive द्वारा संचालित',
  },
}

export function getStrings(lang?: string): Strings {
  const l = lang || getLang()
  return translations[l] || translations.en
}

export function interpolate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''))
}

const PHASE_KEY_MAP: Record<string, keyof Strings> = {
  'New Moon': 'newMoon',
  'Waxing Crescent': 'waxingCrescent',
  'First Quarter': 'firstQuarter',
  'Waxing Gibbous': 'waxingGibbous',
  'Full Moon': 'fullMoon',
  'Waning Gibbous': 'waningGibbous',
  'Last Quarter': 'lastQuarter',
  'Waning Crescent': 'waningCrescent',
}

export function translatePhase(englishPhase: string, lang?: string): string {
  const strings = getStrings(lang)
  const key = PHASE_KEY_MAP[englishPhase]
  if (!key) return englishPhase
  return strings[key] as string
}
