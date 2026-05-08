export interface Player {
  name: string
  nameZh: string
  position: 'GK' | 'DF' | 'MF' | 'FW'
  number: number
  age: number
  club: string
}

export interface Coach {
  name: string
  nameZh: string
  nationality: string
  age: number
}

export interface TeamSquad {
  teamId: string
  coach: Coach
  formation: string // e.g. "4-3-3"
  goalkeepers: Player[]
  defenders: Player[]
  midfielders: Player[]
  forwards: Player[]
}

function p(name: string, nameZh: string, pos: Player['position'], num: number, age: number, club: string): Player {
  return { name, nameZh, position: pos, number: num, age, club }
}

export const squadMap = new Map<string, TeamSquad>()

function add(teamId: string, coach: Coach, formation: string, gk: Player[], df: Player[], mf: Player[], fw: Player[]) {
  squadMap.set(teamId, { teamId, coach, formation, goalkeepers: gk, defenders: df, midfielders: mf, forwards: fw })
}

// ── Argentina ──────────────────────────────────────────
add('ARG',
  { name: 'Lionel Scaloni', nameZh: '斯卡洛尼', nationality: 'ar', age: 48 },
  '4-3-3',
  [p('Emiliano Martínez', '马丁内斯', 'GK', 23, 33, 'Aston Villa'), p('Gerónimo Rulli', '鲁利', 'GK', 1, 34, 'Marseille'), p('Juan Musso', '穆索', 'GK', 12, 32, 'Atalanta')],
  [p('Cristian Romero', '罗梅罗', 'DF', 13, 28, 'Tottenham'), p('Nicolás Otamendi', '奥塔门迪', 'DF', 19, 38, 'Benfica'), p('Lisandro Martínez', '利马', 'DF', 25, 28, 'Man United'), p('Nahuel Molina', '莫利纳', 'DF', 2, 28, 'Atlético Madrid')],
  [p('Enzo Fernández', '恩佐', 'MF', 8, 25, 'Chelsea'), p('Alexis Mac Allister', '麦卡利斯特', 'MF', 20, 27, 'Liverpool'), p('Rodrigo De Paul', '德保罗', 'MF', 7, 32, 'Atlético Madrid'), p('Giovani Lo Celso', '洛塞尔索', 'MF', 17, 30, 'Tottenham')],
  [p('Lionel Messi', '梅西', 'FW', 10, 39, 'Inter Miami'), p('Julián Álvarez', '阿尔瓦雷斯', 'FW', 9, 26, 'Atlético Madrid'), p('Lautaro Martínez', '劳塔罗', 'FW', 22, 28, 'Inter Milan')],
)

// ── Brazil ─────────────────────────────────────────────
add('BRA',
  { name: 'Dorival Júnior', nameZh: '多里瓦尔', nationality: 'br', age: 64 },
  '4-2-3-1',
  [p('Alisson Becker', '阿利松', 'GK', 1, 33, 'Liverpool'), p('Ederson', '埃德森', 'GK', 23, 32, 'Man City'), p('Bento', '本托', 'GK', 12, 27, 'Al-Nassr')],
  [p('Marquinhos', '马尔基尼奥斯', 'DF', 3, 32, 'PSG'), p('Éder Militão', '米利唐', 'DF', 14, 28, 'Real Madrid'), p('Gabriel Magalhães', '加布里埃尔', 'DF', 4, 28, 'Arsenal'), p('Danilo', '达尼洛', 'DF', 2, 34, 'Juventus')],
  [p('Bruno Guimarães', '吉马良斯', 'MF', 5, 28, 'Newcastle'), p('Lucas Paquetá', '帕奎塔', 'MF', 8, 28, 'West Ham'), p('Raphinha', '拉菲尼亚', 'MF', 11, 29, 'Barcelona'), p('Vinícius Júnior', '维尼修斯', 'FW', 7, 25, 'Real Madrid')],
  [p('Rodrygo', '罗德里戈', 'FW', 10, 25, 'Real Madrid'), p('Endrick', '恩德里克', 'FW', 9, 19, 'Real Madrid'), p('Gabriel Martinelli', '马丁内利', 'FW', 21, 25, 'Arsenal')],
)

// ── France ─────────────────────────────────────────────
add('FRA',
  { name: 'Didier Deschamps', nameZh: '德尚', nationality: 'fr', age: 57 },
  '4-3-3',
  [p('Mike Maignan', '迈尼昂', 'GK', 16, 30, 'AC Milan'), p('Brice Samba', '桑巴', 'GK', 1, 32, 'Lens'), p('Lucas Chevalier', '舍瓦利耶', 'GK', 23, 24, 'Lille')],
  [p('William Saliba', '萨利巴', 'DF', 17, 25, 'Arsenal'), p('Ibrahima Konaté', '科纳特', 'DF', 24, 27, 'Liverpool'), p('Théo Hernandez', '特奥', 'DF', 22, 28, 'AC Milan'), p('Jules Koundé', '孔德', 'DF', 5, 27, 'Barcelona')],
  [p('Aurélien Tchouaméni', '楚阿梅尼', 'MF', 8, 26, 'Real Madrid'), p('Eduardo Camavinga', '卡马文加', 'MF', 6, 23, 'Real Madrid'), p('Warren Zaïre-Emery', '埃梅里', 'MF', 18, 20, 'PSG'), p('Michael Olise', '奥利塞', 'MF', 20, 24, 'Bayern Munich')],
  [p('Kylian Mbappé', '姆巴佩', 'FW', 10, 27, 'Real Madrid'), p('Ousmane Dembélé', '登贝莱', 'FW', 7, 29, 'PSG'), p('Marcus Thuram', '图拉姆', 'FW', 9, 28, 'Inter Milan')],
)

// ── England ────────────────────────────────────────────
add('ENG',
  { name: 'Thomas Tuchel', nameZh: '图赫尔', nationality: 'de', age: 52 },
  '4-2-3-1',
  [p('Jordan Pickford', '皮克福德', 'GK', 1, 32, 'Everton'), p('Aaron Ramsdale', '拉姆斯代尔', 'GK', 13, 28, 'Southampton'), p('Dean Henderson', '亨德森', 'GK', 22, 29, 'Crystal Palace')],
  [p('John Stones', '斯通斯', 'DF', 5, 32, 'Man City'), p('Marc Guéhi', '格伊', 'DF', 6, 25, 'Crystal Palace'), p('Trent Alexander-Arnold', '阿诺德', 'DF', 2, 27, 'Liverpool'), p('Luke Shaw', '卢克·肖', 'DF', 3, 30, 'Man United')],
  [p('Declan Rice', '赖斯', 'MF', 4, 27, 'Arsenal'), p('Jude Bellingham', '贝林厄姆', 'MF', 10, 23, 'Real Madrid'), p('Phil Foden', '福登', 'MF', 11, 26, 'Man City'), p('Cole Palmer', '帕尔默', 'MF', 20, 24, 'Chelsea')],
  [p('Harry Kane', '凯恩', 'FW', 9, 32, 'Bayern Munich'), p('Bukayo Saka', '萨卡', 'FW', 7, 24, 'Arsenal'), p('Ollie Watkins', '沃特金斯', 'FW', 19, 30, 'Aston Villa')],
)

// ── Germany ────────────────────────────────────────────
add('GER',
  { name: 'Julian Nagelsmann', nameZh: '纳格尔斯曼', nationality: 'de', age: 38 },
  '4-2-3-1',
  [p('Marc-André ter Stegen', '特尔施特根', 'GK', 1, 34, 'Barcelona'), p('Alexander Nübel', '努贝尔', 'GK', 12, 29, 'Stuttgart'), p('Oliver Baumann', '鲍曼', 'GK', 22, 36, 'Hoffenheim')],
  [p('Antonio Rüdiger', '吕迪格', 'DF', 2, 33, 'Real Madrid'), p('Jonathan Tah', '塔', 'DF', 4, 30, 'Bayer Leverkusen'), p('Joshua Kimmich', '基米希', 'DF', 6, 31, 'Bayern Munich'), p('David Raum', '劳姆', 'DF', 3, 28, 'RB Leipzig')],
  [p('Jamal Musiala', '穆西亚拉', 'MF', 10, 23, 'Bayern Munich'), p('Florian Wirtz', '维尔茨', 'MF', 7, 23, 'Bayer Leverkusen'), p('Leon Goretzka', '格雷茨卡', 'MF', 8, 31, 'Bayern Munich'), p('Kai Havertz', '哈弗茨', 'MF', 19, 27, 'Arsenal')],
  [p('Leroy Sané', '萨内', 'FW', 17, 30, 'Bayern Munich'), p('Niclas Füllkrug', '菲尔克鲁格', 'FW', 9, 33, 'West Ham'), p('Serge Gnabry', '格纳布里', 'FW', 11, 30, 'Bayern Munich')],
)

// ── Spain ──────────────────────────────────────────────
add('ESP',
  { name: 'Luis de la Fuente', nameZh: '德拉富恩特', nationality: 'es', age: 64 },
  '4-3-3',
  [p('Unai Simón', '乌奈·西蒙', 'GK', 23, 29, 'Athletic Club'), p('David Raya', '拉亚', 'GK', 1, 30, 'Arsenal'), p('Álex Remiro', '雷米罗', 'GK', 13, 31, 'Real Sociedad')],
  [p('Dani Carvajal', '卡瓦哈尔', 'DF', 2, 34, 'Real Madrid'), p('Aymeric Laporte', '拉波尔特', 'DF', 14, 32, 'Al-Nassr'), p('Pau Cubarsí', '库巴西', 'DF', 4, 19, 'Barcelona'), p('Álex Grimaldo', '格里马尔多', 'DF', 12, 30, 'Bayer Leverkusen')],
  [p('Rodri', '罗德里', 'MF', 16, 29, 'Man City'), p('Pedri', '佩德里', 'MF', 8, 23, 'Barcelona'), p('Gavi', '加维', 'MF', 9, 21, 'Barcelona'), p('Fabián Ruiz', '法比安·鲁伊斯', 'MF', 6, 30, 'PSG')],
  [p('Lamine Yamal', '亚马尔', 'FW', 19, 18, 'Barcelona'), p('Nico Williams', '尼科·威廉姆斯', 'FW', 17, 23, 'Athletic Club'), p('Álvaro Morata', '莫拉塔', 'FW', 7, 33, 'Atlético Madrid')],
)

// ── Portugal ───────────────────────────────────────────
add('POR',
  { name: 'Roberto Martínez', nameZh: '罗伯托·马丁内斯', nationality: 'es', age: 52 },
  '4-3-3',
  [p('Diogo Costa', '迪奥戈·科斯塔', 'GK', 1, 26, 'Porto'), p('Rui Patrício', '帕特里西奥', 'GK', 12, 38, 'Roma'), p('José Sá', '若泽·萨', 'GK', 22, 33, 'Wolves')],
  [p('Rúben Dias', '鲁本·迪亚斯', 'DF', 3, 29, 'Man City'), p('Nuno Mendes', '努诺·门德斯', 'DF', 19, 24, 'PSG'), p('Gonçalo Inácio', '伊纳西奥', 'DF', 14, 24, 'Sporting CP'), p('João Cancelo', '坎塞洛', 'DF', 20, 32, 'Barcelona')],
  [p('Bruno Fernandes', 'B费', 'MF', 8, 31, 'Man United'), p('Bernardo Silva', 'B席', 'MF', 10, 31, 'Man City'), p('João Palhinha', '帕利尼亚', 'MF', 6, 30, 'Bayern Munich'), p('Vitinha', '维蒂尼亚', 'MF', 23, 26, 'PSG')],
  [p('Cristiano Ronaldo', 'C罗', 'FW', 7, 41, 'Al-Nassr'), p('Rafael Leão', '莱奥', 'FW', 17, 27, 'AC Milan'), p('Gonçalo Ramos', '拉莫斯', 'FW', 9, 25, 'PSG')],
)

// ── Italy ──────────────────────────────────────────────
add('ITA',
  { name: 'Luciano Spalletti', nameZh: '斯帕莱蒂', nationality: 'it', age: 67 },
  '3-5-2',
  [p('Gianluigi Donnarumma', '多纳鲁马', 'GK', 1, 27, 'PSG'), p('Guglielmo Vicario', '维卡里奥', 'GK', 12, 29, 'Tottenham'), p('Alex Meret', '梅雷特', 'GK', 26, 29, 'Napoli')],
  [p('Alessandro Bastoni', '巴斯托尼', 'DF', 23, 27, 'Inter Milan'), p('Giorgio Scalvini', '斯卡尔维尼', 'DF', 5, 22, 'Atalanta'), p('Federico Dimarco', '迪马尔科', 'DF', 3, 28, 'Inter Milan'), p('Giovanni Di Lorenzo', '迪洛伦佐', 'DF', 22, 31, 'Napoli')],
  [p('Nicolò Barella', '巴雷拉', 'MF', 18, 29, 'Inter Milan'), p('Sandro Tonali', '托纳利', 'MF', 8, 26, 'Newcastle'), p('Federico Chiesa', '基耶萨', 'MF', 14, 28, 'Liverpool'), p('Lorenzo Pellegrini', '佩莱格里尼', 'MF', 7, 29, 'Roma')],
  [p('Giacomo Raspadori', '拉斯帕多里', 'FW', 10, 26, 'Napoli'), p('Mateo Retegui', '雷特吉', 'FW', 9, 27, 'Atalanta'), p('Moise Kean', '基恩', 'FW', 20, 26, 'Fiorentina')],
)

// ── Netherlands ────────────────────────────────────────
add('NED',
  { name: 'Ronald Koeman', nameZh: '科曼', nationality: 'nl', age: 63 },
  '4-3-3',
  [p('Bart Verbruggen', '费布吕亨', 'GK', 1, 23, 'Brighton'), p('Mark Flekken', '弗莱肯', 'GK', 13, 32, 'Brentford'), p('Justin Bijlow', '拜洛', 'GK', 23, 28, 'Feyenoord')],
  [p('Virgil van Dijk', '范戴克', 'DF', 4, 34, 'Liverpool'), p('Matthijs de Ligt', '德利赫特', 'DF', 3, 26, 'Man United'), p('Denzel Dumfries', '邓弗里斯', 'DF', 22, 30, 'Inter Milan'), p('Nathan Aké', '阿克', 'DF', 5, 31, 'Man City')],
  [p('Frenkie de Jong', '德容', 'MF', 21, 29, 'Barcelona'), p('Ryan Gravenberch', '赫拉芬贝赫', 'MF', 8, 24, 'Liverpool'), p('Tijjani Reijnders', '赖恩德斯', 'MF', 14, 27, 'AC Milan'), p('Xavi Simons', '西蒙斯', 'MF', 10, 23, 'RB Leipzig')],
  [p('Cody Gakpo', '加克波', 'FW', 11, 27, 'Liverpool'), p('Memphis Depay', '德佩', 'FW', 9, 32, 'Atlético Madrid'), p('Donyell Malen', '马伦', 'FW', 18, 27, 'Borussia Dortmund')],
)

// ── Belgium ────────────────────────────────────────────
add('BEL',
  { name: 'Domenico Tedesco', nameZh: '特德斯科', nationality: 'de', age: 40 },
  '4-2-3-1',
  [p('Thibaut Courtois', '库尔图瓦', 'GK', 1, 34, 'Real Madrid'), p('Matz Sels', '塞尔斯', 'GK', 12, 34, 'Nottingham Forest'), p('Koen Casteels', '卡斯特尔斯', 'GK', 13, 33, 'Al-Qadsiah')],
  [p('Wout Faes', '费斯', 'DF', 4, 28, 'Leicester'), p('Zeno Debast', '德巴斯特', 'DF', 2, 22, 'Sporting CP'), p('Maxim De Cuyper', '德克伊珀', 'DF', 21, 25, 'Club Brugge'), p('Timothy Castagne', '卡斯塔涅', 'DF', 15, 30, 'Fulham')],
  [p('Amadou Onana', '奥纳纳', 'MF', 6, 24, 'Aston Villa'), p('Kevin De Bruyne', '德布劳内', 'MF', 7, 34, 'Man City'), p('Jérémy Doku', '多库', 'MF', 11, 24, 'Man City'), p('Leandro Trossard', '特罗萨德', 'MF', 17, 31, 'Arsenal')],
  [p('Romelu Lukaku', '卢卡库', 'FW', 9, 33, 'Napoli'), p('Loïs Openda', '奥蓬达', 'FW', 10, 26, 'RB Leipzig'), p('Johan Bakayoko', '巴卡约科', 'FW', 19, 23, 'PSV')],
)

// ── Croatia ────────────────────────────────────────────
add('CRO',
  { name: 'Zlatko Dalić', nameZh: '达利奇', nationality: 'hr', age: 59 },
  '4-3-3',
  [p('Dominik Livaković', '利瓦科维奇', 'GK', 1, 31, 'Fenerbahçe'), p('Ivica Ivušić', '伊武希奇', 'GK', 12, 31, 'Pafos'), p('Nediljko Labrović', '拉布罗维奇', 'GK', 23, 26, 'Augsburg')],
  [p('Joško Gvardiol', '格瓦迪奥尔', 'DF', 4, 24, 'Man City'), p('Josip Šutalo', '舒塔洛', 'DF', 6, 26, 'Ajax'), p('Josip Stanišić', '斯塔尼希奇', 'DF', 2, 26, 'Bayern Munich'), p('Borna Sosa', '索萨', 'DF', 3, 28, 'Torino')],
  [p('Luka Modrić', '莫德里奇', 'MF', 10, 40, 'Real Madrid'), p('Mateo Kovačić', '科瓦契奇', 'MF', 8, 32, 'Man City'), p('Lovro Majer', '马耶尔', 'MF', 7, 28, 'Wolfsburg'), p('Luka Sučić', '苏契奇', 'MF', 25, 24, 'Real Sociedad')],
  [p('Andrej Kramarić', '克拉马里奇', 'FW', 9, 34, 'Hoffenheim'), p('Bruno Petković', '佩特科维奇', 'FW', 17, 31, 'Dinamo Zagreb'), p('Ante Budimir', '布迪米尔', 'FW', 11, 33, 'Osasuna')],
)

// ── Japan ──────────────────────────────────────────────
add('JPN',
  { name: 'Hajime Moriyasu', nameZh: '森保一', nationality: 'jp', age: 57 },
  '4-2-3-1',
  [p('Zion Suzuki', '铃木彩艳', 'GK', 23, 23, 'Parma'), p('Keisuke Osako', '大迫敬介', 'GK', 1, 26, 'Sanfrecce Hiroshima'), p('Kosei Tani', '谷晃生', 'GK', 12, 25, 'Dender')],
  [p('Takehiro Tomiyasu', '冨安健洋', 'DF', 22, 27, 'Arsenal'), p('Ko Itakura', '板仓滉', 'DF', 4, 29, 'Borussia MG'), p('Yukinari Sugawara', '菅原由势', 'DF', 2, 25, 'Southampton'), p('Hiroki Ito', '伊藤洋辉', 'DF', 3, 27, 'Bayern Munich')],
  [p('Wataru Endō', '远藤航', 'MF', 6, 33, 'Liverpool'), p('Daichi Kamada', '镰田大地', 'MF', 15, 29, 'Crystal Palace'), p('Takefusa Kubo', '久保建英', 'MF', 11, 25, 'Real Sociedad'), p('Kaoru Mitoma', '三笘薰', 'MF', 7, 29, 'Brighton')],
  [p('Ayase Ueda', '上田绮世', 'FW', 9, 27, 'Feyenoord'), p('Takumi Minamino', '南野拓实', 'FW', 10, 31, 'Monaco'), p('Shuto Machino', '町野修斗', 'FW', 19, 26, 'Holstein Kiel')],
)

// ── Korea Republic ─────────────────────────────────────
add('KOR',
  { name: 'Hong Myung-bo', nameZh: '洪明甫', nationality: 'kr', age: 57 },
  '4-4-2',
  [p('Kim Seung-gyu', '金承奎', 'GK', 1, 35, 'Al-Shabab'), p('Jo Hyeon-woo', '赵贤佑', 'GK', 21, 34, 'Ulsan HD'), p('Song Bum-keun', '宋范根', 'GK', 12, 28, 'Shonan Bellmare')],
  [p('Kim Min-jae', '金玟哉', 'DF', 4, 29, 'Bayern Munich'), p('Seol Young-woo', '薛英佑', 'DF', 22, 27, 'Ulsan HD'), p('Lee Ki-je', '李记帝', 'DF', 3, 34, 'Suwon Samsung'), p('Kim Young-gwon', '金英权', 'DF', 19, 36, 'Ulsan HD')],
  [p('Son Heung-min', '孙兴慜', 'MF', 7, 33, 'Tottenham'), p('Hwang In-beom', '黄仁范', 'MF', 6, 29, 'Feyenoord'), p('Lee Kang-in', '李刚仁', 'MF', 18, 25, 'PSG'), p('Lee Jae-sung', '李在城', 'MF', 10, 33, 'Mainz')],
  [p('Hwang Hee-chan', '黄喜灿', 'FW', 11, 30, 'Wolves'), p('Cho Gue-sung', '曹圭成', 'FW', 9, 28, 'Midtjylland'), p('Oh Hyeon-gyu', '吴贤揆', 'FW', 17, 25, 'Celtic')],
)

// ── USA ────────────────────────────────────────────────
add('USA',
  { name: 'Mauricio Pochettino', nameZh: '波切蒂诺', nationality: 'ar', age: 54 },
  '4-3-3',
  [p('Matt Turner', '特纳', 'GK', 1, 31, 'Nottingham Forest'), p('Ethan Horvath', '霍瓦特', 'GK', 18, 30, 'Cardiff'), p('Gaga Slonina', '斯沃尼纳', 'GK', 25, 22, 'Chelsea')],
  [p('Antonee Robinson', '罗宾逊', 'DF', 5, 28, 'Fulham'), p('Chris Richards', '理查兹', 'DF', 3, 26, 'Crystal Palace'), p('Tim Ream', '里姆', 'DF', 13, 38, 'Charlotte FC'), p('Sergiño Dest', '德斯特', 'DF', 2, 25, 'PSV')],
  [p('Tyler Adams', '亚当斯', 'MF', 4, 27, 'Bournemouth'), p('Weston McKennie', '麦肯尼', 'MF', 8, 27, 'Juventus'), p('Yunus Musah', '穆萨', 'MF', 6, 23, 'AC Milan'), p('Giovanni Reyna', '雷纳', 'MF', 7, 23, 'Borussia Dortmund')],
  [p('Christian Pulisic', '普利西奇', 'FW', 10, 27, 'AC Milan'), p('Folarin Balogun', '巴洛贡', 'FW', 9, 24, 'Monaco'), p('Timothy Weah', '维阿', 'FW', 21, 26, 'Juventus')],
)

// ── Mexico ─────────────────────────────────────────────
add('MEX',
  { name: 'Javier Aguirre', nameZh: '阿吉雷', nationality: 'mx', age: 66 },
  '4-3-3',
  [p('Luis Ángel Malagón', '马拉贡', 'GK', 1, 29, 'América'), p('Carlos Acevedo', '阿塞维多', 'GK', 12, 30, 'Santos Laguna'), p('Raúl Rangel', '兰赫尔', 'GK', 21, 25, 'Guadalajara')],
  [p('César Montes', '蒙特斯', 'DF', 3, 29, 'Almería'), p('Johan Vásquez', '巴斯克斯', 'DF', 5, 27, 'Genoa'), p('Jorge Sánchez', '豪尔赫·桑切斯', 'DF', 2, 28, 'Porto'), p('Jesús Gallardo', '加利亚多', 'DF', 23, 30, 'Monterrey')],
  [p('Edson Álvarez', '埃德松·阿尔瓦雷斯', 'MF', 4, 28, 'West Ham'), p('Luis Chávez', '路易斯·查韦斯', 'MF', 18, 30, 'Dynamo Moscow'), p('Orbelín Pineda', '皮内达', 'MF', 17, 30, 'AEK Athens'), p('Erick Sánchez', '埃里克·桑切斯', 'MF', 14, 26, 'América')],
  [p('Santiago Giménez', '希门尼斯', 'FW', 11, 25, 'AC Milan'), p('Raúl Jiménez', '劳尔·希门尼斯', 'FW', 9, 35, 'Fulham'), p('Hirving Lozano', '洛萨诺', 'FW', 22, 30, 'PSV')],
)

// ── Canada ─────────────────────────────────────────────
add('CAN',
  { name: 'Jesse Marsch', nameZh: '马希', nationality: 'us', age: 52 },
  '4-4-2',
  [p('Dayne St. Clair', '圣克莱尔', 'GK', 1, 29, 'Minnesota United'), p('Maxime Crépeau', '克雷波', 'GK', 16, 32, 'Portland Timbers'), p('Jonathan Sirois', '西罗瓦', 'GK', 18, 25, 'CF Montréal')],
  [p('Alphonso Davies', '阿方索·戴维斯', 'DF', 19, 25, 'Bayern Munich'), p('Derek Cornelius', '科尼利厄斯', 'DF', 4, 28, 'Marseille'), p('Alistair Johnston', '约翰斯顿', 'DF', 2, 27, 'Celtic'), p('Richie Laryea', '拉尔耶', 'DF', 22, 31, 'Toronto FC')],
  [p('Stephen Eustáquio', '欧斯塔基奥', 'MF', 7, 29, 'Porto'), p('Jonathan Osorio', '奥索里奥', 'MF', 21, 33, 'Toronto FC'), p('Ismaël Koné', '科内', 'MF', 8, 24, 'Marseille'), p('Ali Ahmed', '艾哈迈德', 'MF', 15, 25, 'Vancouver Whitecaps')],
  [p('Jonathan David', '戴维', 'FW', 10, 26, 'Lille'), p('Cyle Larin', '拉林', 'FW', 17, 31, 'Mallorca'), p('Tajon Buchanan', '布坎南', 'FW', 11, 27, 'Inter Milan')],
)

// ── Morocco ────────────────────────────────────────────
add('MAR',
  { name: 'Walid Regragui', nameZh: '雷格拉吉', nationality: 'ma', age: 50 },
  '4-3-3',
  [p('Yassine Bounou', '布努', 'GK', 1, 35, 'Al-Hilal'), p('Munir Mohamedi', '穆尼尔', 'GK', 12, 36, 'Al-Wehda'), p('Mehdi Benabid', '贝纳比德', 'GK', 22, 28, 'FAR Rabat')],
  [p('Achraf Hakimi', '阿什拉夫', 'DF', 2, 27, 'PSG'), p('Nayef Aguerd', '阿盖尔德', 'DF', 5, 30, 'West Ham'), p('Romain Saïss', '赛斯', 'DF', 6, 36, 'Al-Sadd'), p('Noussair Mazraoui', '马兹拉维', 'DF', 3, 28, 'Man United')],
  [p('Sofyan Amrabat', '阿姆拉巴特', 'MF', 4, 29, 'Fenerbahçe'), p('Azzedine Ounahi', '欧纳希', 'MF', 8, 26, 'Marseille'), p('Bilal El Khannouss', '汉努斯', 'MF', 15, 22, 'Leicester'), p('Amine Harit', '阿里特', 'MF', 7, 29, 'Marseille')],
  [p('Brahim Díaz', '卜拉欣·迪亚斯', 'FW', 10, 26, 'Real Madrid'), p('Youssef En-Nesyri', '恩内斯里', 'FW', 19, 29, 'Fenerbahçe'), p('Eliesse Ben Seghir', '本·塞吉尔', 'FW', 23, 21, 'Monaco')],
)

// ── Senegal ────────────────────────────────────────────
add('SEN',
  { name: 'Pape Thiaw', nameZh: '蒂亚夫', nationality: 'sn', age: 45 },
  '4-3-3',
  [p('Édouard Mendy', '爱德华·门迪', 'GK', 1, 34, 'Al-Ahli'), p('Seny Dieng', '迪昂', 'GK', 16, 31, 'Middlesbrough'), p('Mory Diaw', '迪奥', 'GK', 23, 32, 'Clermont')],
  [p('Kalidou Koulibaly', '库利巴利', 'DF', 3, 34, 'Al-Hilal'), p('Moussa Niakhaté', '尼亚卡特', 'DF', 4, 30, 'Lyon'), p('Ismail Jakobs', '雅各布斯', 'DF', 14, 26, 'Galatasaray'), p('Abdou Diallo', '迪亚洛', 'DF', 22, 30, 'Al-Arabi')],
  [p('Pape Matar Sarr', '帕佩·萨尔', 'MF', 17, 23, 'Tottenham'), p('Idrissa Gueye', '盖耶', 'MF', 5, 36, 'Everton'), p('Lamine Camara', '卡马拉', 'MF', 6, 22, 'Monaco'), p('Pape Gueye', '帕佩·盖耶', 'MF', 15, 27, 'Villarreal')],
  [p('Sadio Mané', '马内', 'FW', 10, 34, 'Al-Nassr'), p('Nicolas Jackson', '杰克逊', 'FW', 9, 25, 'Chelsea'), p('Ismaïla Sarr', '伊斯梅拉·萨尔', 'FW', 18, 28, 'Crystal Palace')],
)

// ── Uruguay ────────────────────────────────────────────
add('URU',
  { name: 'Marcelo Bielsa', nameZh: '贝尔萨', nationality: 'ar', age: 69 },
  '4-3-3',
  [p('Sergio Rochet', '罗切特', 'GK', 1, 33, 'Internacional'), p('Santiago Mele', '梅莱', 'GK', 12, 28, 'Junior'), p('Franco Israel', '伊斯雷尔', 'GK', 23, 26, 'Sporting CP')],
  [p('Ronald Araújo', '阿劳霍', 'DF', 4, 27, 'Barcelona'), p('José María Giménez', '希门尼斯', 'DF', 2, 31, 'Atlético Madrid'), p('Mathías Olivera', '奥利维拉', 'DF', 16, 28, 'Napoli'), p('Nahitan Nández', '南德斯', 'DF', 8, 30, 'Al-Qadsiah')],
  [p('Federico Valverde', '巴尔韦德', 'MF', 15, 27, 'Real Madrid'), p('Manuel Ugarte', '乌加特', 'MF', 5, 25, 'Man United'), p('Giorgian de Arrascaeta', '德阿拉斯卡埃塔', 'MF', 10, 31, 'Flamengo'), p('Rodrigo Bentancur', '本坦库尔', 'MF', 6, 29, 'Tottenham')],
  [p('Darwin Núñez', '努涅斯', 'FW', 11, 26, 'Liverpool'), p('Luis Suárez', '苏亚雷斯', 'FW', 9, 39, 'Inter Miami'), p('Facundo Pellistri', '佩利斯特里', 'FW', 21, 24, 'Man United')],
)

// ── Colombia ───────────────────────────────────────────
add('COL',
  { name: 'Néstor Lorenzo', nameZh: '洛伦索', nationality: 'ar', age: 60 },
  '4-2-3-1',
  [p('Camilo Vargas', '巴尔加斯', 'GK', 12, 37, 'Atlas'), p('Álvaro Montero', '蒙特罗', 'GK', 1, 31, 'Millonarios'), p('Kevin Mier', '米尔', 'GK', 22, 26, 'Cruz Azul')],
  [p('Davinson Sánchez', '达文松·桑切斯', 'DF', 23, 29, 'Galatasaray'), p('Carlos Cuesta', '库埃斯塔', 'DF', 3, 27, 'Genk'), p('Daniel Muñoz', '穆尼奥斯', 'DF', 21, 29, 'Crystal Palace'), p('Johan Mojica', '莫希卡', 'DF', 17, 33, 'Mallorca')],
  [p('Jefferson Lerma', '莱尔马', 'MF', 8, 31, 'Crystal Palace'), p('Jhon Arias', '阿里亚斯', 'MF', 11, 28, 'Fluminense'), p('James Rodríguez', 'J罗', 'MF', 10, 34, 'Rayo Vallecano'), p('Jhon Durán', '杜兰', 'MF', 19, 22, 'Al-Nassr')],
  [p('Luis Díaz', '路易斯·迪亚斯', 'FW', 7, 29, 'Liverpool'), p('Rafael Santos Borré', '博雷', 'FW', 9, 30, 'Internacional'), p('Jhon Córdoba', '科尔多瓦', 'FW', 24, 33, 'Krasnodar')],
)

// Generators for remaining teams ─────────────────────────
function defaultSquad(teamId: string, coachName: string, coachNat: string): TeamSquad {
  const posChars: Record<string, string[]> = {
    GK: ['A', 'B', 'C'],
    DF: ['D', 'E', 'F', 'G'],
    MF: ['H', 'I', 'J', 'K'],
    FW: ['L', 'M', 'N'],
  }
  function gen(pos: Player['position'], i: number): Player {
    return { name: `Player ${posChars[pos][i]}-${teamId}`, nameZh: `球员${posChars[pos][i]}`, position: pos, number: (i + 1) * (pos === 'GK' ? 1 : pos === 'DF' ? 4 : pos === 'MF' ? 8 : 12), age: 22 + i * 3, club: 'TBD' }
  }
  return {
    teamId,
    coach: { name: coachName, nameZh: coachName, nationality: coachNat, age: 45 },
    formation: '4-4-2',
    goalkeepers: [gen('GK', 0), gen('GK', 1), gen('GK', 2)],
    defenders: [gen('DF', 0), gen('DF', 1), gen('DF', 2), gen('DF', 3)],
    midfielders: [gen('MF', 0), gen('MF', 1), gen('MF', 2)],
    forwards: [gen('FW', 0), gen('FW', 1), gen('FW', 2)],
  }
}

// Fill remaining teams with placeholder data
const doneTeams = new Set(squadMap.keys())
const remainingCoaches: Record<string, [string, string]> = {
  DEN: ['Kasper Hjulmand', 'dk'], SUI: ['Murat Yakin', 'ch'], AUT: ['Ralf Rangnick', 'de'],
  UKR: ['Serhiy Rebrov', 'ua'], SRB: ['Dragan Stojković', 'rs'], SCO: ['Steve Clarke', 'gb-sct'],
  NOR: ['Ståle Solbakken', 'no'], IRN: ['Amir Ghalenoei', 'ir'], KSA: ['Roberto Mancini', 'it'],
  AUS: ['Graham Arnold', 'au'], QAT: ['Tintín Márquez', 'es'], UAE: ['Paulo Bento', 'pt'],
  UZB: ['Srečko Katanec', 'si'], EGY: ['Hossam Hassan', 'eg'], NGA: ['Eric Chelle', 'ml'],
  CMR: ['Marc Brys', 'be'], GHA: ['Otto Addo', 'gh'], CIV: ['Emerse Faé', 'ci'],
  TUN: ['Jalel Kadri', 'tn'], ALG: ['Vladimir Petković', 'ba'], CRC: ['Gustavo Alfaro', 'ar'],
  PAN: ['Thomas Christiansen', 'dk'], JAM: ['Steve McClaren', 'gb-eng'], CHI: ['Ricardo Gareca', 'ar'],
  ECU: ['Sebastián Beccacece', 'ar'], NZL: ['Darren Bazeley', 'nz'], PAR: ['Gustavo Alfaro', 'ar'],
  IRQ: ['Jesús Casas', 'es'],
}

for (const [tid, [cname, cnat]] of Object.entries(remainingCoaches)) {
  if (!doneTeams.has(tid)) add(tid, { name: cname, nameZh: cname, nationality: cnat, age: 50 }, '4-4-2',
    [p('GK 1', '门将', 'GK', 1, 28, 'TBD'), p('GK 2', '门将', 'GK', 13, 25, 'TBD'), p('GK 3', '门将', 'GK', 23, 22, 'TBD')],
    [p('DF 1', '后卫', 'DF', 2, 27, 'TBD'), p('DF 2', '后卫', 'DF', 3, 26, 'TBD'), p('DF 3', '后卫', 'DF', 5, 28, 'TBD'), p('DF 4', '后卫', 'DF', 6, 25, 'TBD')],
    [p('MF 1', '中场', 'MF', 4, 26, 'TBD'), p('MF 2', '中场', 'MF', 8, 27, 'TBD'), p('MF 3', '中场', 'MF', 10, 24, 'TBD')],
    [p('FW 1', '前锋', 'FW', 7, 27, 'TBD'), p('FW 2', '前锋', 'FW', 9, 26, 'TBD'), p('FW 3', '前锋', 'FW', 11, 23, 'TBD')],
  )
}
