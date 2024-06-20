#!/bin/sh

firstLineWordArr=($1})
firstWord=${firstLineWordArr[0]};

allSupportedEmojis=('😀' '😃' '😄' '😁' '😆' '😅' '🤣' '😂' '🙂' '🙃' '🫠' '😉' '😊' '😇' '🥰' '😍' '🤩' '😘' '😗' '☺' '😚' '😙' '🥲' '😋' '😛' '😜' '🤪' '😝' '🤑' '🤗' '🤭' '🫢' '🫣' '🤫' '🤔' '🫡' '🤐' '🤨' '😐' '😑' '😶' '🫥' '😶‍🌫️' '😏' '😒' '🙄' '😬' '😮‍💨' '🤥' '🫨' '😌' '😔' '😪' '🤤' '😴' '😷' '🤒' '🤕' '🤢' '🤮' '🤧' '🥵' '🥶' '🥴' '😵' '😵‍💫' '🤯' '🤠' '🥳' '🥸' '😎' '🤓' '🧐' '😕' '🫤' '😟' '🙁' '☹' '😮' '😯' '😲' '😳' '🥺' '🥹' '😦' '😧' '😨' '😰' '😥' '😢' '😭' '😱' '😖' '😣' '😞' '😓' '😩' '😫' '🥱' '😤' '😡' '😠' '🤬' '😈' '👿' '💀' '☠' '💩' '🤡' '👹' '👺' '👻' '👽' '👾' '🤖' '😺' '😸' '😹' '😻' '😼' '😽' '🙀' '😿' '😾' '🙈' '🙉' '🙊' '💌' '💘' '💝' '💖' '💗' '💓' '💞' '💕' '💟' '❣' '💔' '❤️‍🔥' '❤️‍🩹' '❤' '🩷' '🧡' '💛' '💚' '💙' '🩵' '💜' '🤎' '🖤' '🩶' '🤍' '💋' '💯' '💢' '💥' '💫' '💦' '💨' '🕳' '💬' '👁️‍🗨️' '🗨' '🗯' '💭' '💤' '👋' '🤚' '🖐' '✋' '🖖' '🫱' '🫲' '🫳' '🫴' '🫷' '🫸' '👌' '🤌' '🤏' '✌' '🤞' '🫰' '🤟' '🤘' '🤙' '👈' '👉' '👆' '🖕' '👇' '☝' '🫵' '👍' '👎' '✊' '👊' '🤛' '🤜' '👏' '🙌' '🫶' '👐' '🤲' '🤝' '🙏' '✍' '💅' '🤳' '💪' '🦾' '🦿' '🦵' '🦶' '👂' '🦻' '👃' '🧠' '🫀' '🫁' '🦷' '🦴' '👀' '👁' '👅' '👄' '🫦' '👶' '🧒' '👦' '👧' '🧑' '👱' '👨' '🧔' '🧔‍♂️' '🧔‍♀️' '👨‍🦰' '👨‍🦱' '👨‍🦳' '👨‍🦲' '👩' '👩‍🦰' '🧑‍🦰' '👩‍🦱' '🧑‍🦱' '👩‍🦳' '🧑‍🦳' '👩‍🦲' '🧑‍🦲' '👱‍♀️' '👱‍♂️' '🧓' '👴' '👵' '🙍' '🙍‍♂️' '🙍‍♀️' '🙎' '🙎‍♂️' '🙎‍♀️' '🙅' '🙅‍♂️' '🙅‍♀️' '🙆' '🙆‍♂️' '🙆‍♀️' '💁' '💁‍♂️' '💁‍♀️' '🙋' '🙋‍♂️' '🙋‍♀️' '🧏' '🧏‍♂️' '🧏‍♀️' '🙇' '🙇‍♂️' '🙇‍♀️' '🤦' '🤦‍♂️' '🤦‍♀️' '🤷' '🤷‍♂️' '🤷‍♀️' '🧑‍⚕️' '👨‍⚕️' '👩‍⚕️' '🧑‍🎓' '👨‍🎓' '👩‍🎓' '🧑‍🏫' '👨‍🏫' '👩‍🏫' '🧑‍⚖️' '👨‍⚖️' '👩‍⚖️' '🧑‍🌾' '👨‍🌾' '👩‍🌾' '🧑‍🍳' '👨‍🍳' '👩‍🍳' '🧑‍🔧' '👨‍🔧' '👩‍🔧' '🧑‍🏭' '👨‍🏭' '👩‍🏭' '🧑‍💼' '👨‍💼' '👩‍💼' '🧑‍🔬' '👨‍🔬' '👩‍🔬' '🧑‍💻' '👨‍💻' '👩‍💻' '🧑‍🎤' '👨‍🎤' '👩‍🎤' '🧑‍🎨' '👨‍🎨' '👩‍🎨' '🧑‍✈️' '👨‍✈️' '👩‍✈️' '🧑‍🚀' '👨‍🚀' '👩‍🚀' '🧑‍🚒' '👨‍🚒' '👩‍🚒' '👮' '👮‍♂️' '👮‍♀️' '🕵' '🕵️‍♂️' '🕵️‍♀️' '💂' '💂‍♂️' '💂‍♀️' '🥷' '👷' '👷‍♂️' '👷‍♀️' '🫅' '🤴' '👸' '👳' '👳‍♂️' '👳‍♀️' '👲' '🧕' '🤵' '🤵‍♂️' '🤵‍♀️' '👰' '👰‍♂️' '👰‍♀️' '🤰' '🫃' '🫄' '🤱' '👩‍🍼' '👨‍🍼' '🧑‍🍼' '👼' '🎅' '🤶' '🧑‍🎄' '🦸' '🦸‍♂️' '🦸‍♀️' '🦹' '🦹‍♂️' '🦹‍♀️' '🧙' '🧙‍♂️' '🧙‍♀️' '🧚' '🧚‍♂️' '🧚‍♀️' '🧛' '🧛‍♂️' '🧛‍♀️' '🧜' '🧜‍♂️' '🧜‍♀️' '🧝' '🧝‍♂️' '🧝‍♀️' '🧞' '🧞‍♂️' '🧞‍♀️' '🧟' '🧟‍♂️' '🧟‍♀️' '🧌' '💆' '💆‍♂️' '💆‍♀️' '💇' '💇‍♂️' '💇‍♀️' '🚶' '🚶‍♂️' '🚶‍♀️' '🧍' '🧍‍♂️' '🧍‍♀️' '🧎' '🧎‍♂️' '🧎‍♀️' '🧑‍🦯' '👨‍🦯' '👩‍🦯' '🧑‍🦼' '👨‍🦼' '👩‍🦼' '🧑‍🦽' '👨‍🦽' '👩‍🦽' '🏃' '🏃‍♂️' '🏃‍♀️' '💃' '🕺' '🕴' '👯' '👯‍♂️' '👯‍♀️' '🧖' '🧖‍♂️' '🧖‍♀️' '🧗' '🧗‍♂️' '🧗‍♀️' '🤺' '🏇' '⛷' '🏂' '🏌' '🏌️‍♂️' '🏌️‍♀️' '🏄' '🏄‍♂️' '🏄‍♀️' '🚣' '🚣‍♂️' '🚣‍♀️' '🏊' '🏊‍♂️' '🏊‍♀️' '⛹' '⛹️‍♂️' '⛹️‍♀️' '🏋' '🏋️‍♂️' '🏋️‍♀️' '🚴' '🚴‍♂️' '🚴‍♀️' '🚵' '🚵‍♂️' '🚵‍♀️' '🤸' '🤸‍♂️' '🤸‍♀️' '🤼' '🤼‍♂️' '🤼‍♀️' '🤽' '🤽‍♂️' '🤽‍♀️' '🤾' '🤾‍♂️' '🤾‍♀️' '🤹' '🤹‍♂️' '🤹‍♀️' '🧘' '🧘‍♂️' '🧘‍♀️' '🛀' '🛌' '🧑‍🤝‍🧑' '👭' '👫' '👬' '💏' '👩‍❤️‍💋‍👨' '👨‍❤️‍💋‍👨' '👩‍❤️‍💋‍👩' '💑' '👩‍❤️‍👨' '👨‍❤️‍👨' '👩‍❤️‍👩' '👪' '👨‍👩‍👦' '👨‍👩‍👧' '👨‍👩‍👧‍👦' '👨‍👩‍👦‍👦' '👨‍👩‍👧‍👧' '👨‍👨‍👦' '👨‍👨‍👧' '👨‍👨‍👧‍👦' '👨‍👨‍👦‍👦' '👨‍👨‍👧‍👧' '👩‍👩‍👦' '👩‍👩‍👧' '👩‍👩‍👧‍👦' '👩‍👩‍👦‍👦' '👩‍👩‍👧‍👧' '👨‍👦' '👨‍👦‍👦' '👨‍👧' '👨‍👧‍👦' '👨‍👧‍👧' '👩‍👦' '👩‍👦‍👦' '👩‍👧' '👩‍👧‍👦' '👩‍👧‍👧' '🗣' '👤' '👥' '🫂' '👣' '🦰' '🦱' '🦳' '🦲' '🐵' '🐒' '🦍' '🦧' '🐶' '🐕' '🦮' '🐕‍🦺' '🐩' '🐺' '🦊' '🦝' '🐱' '🐈' '🐈‍⬛' '🦁' '🐯' '🐅' '🐆' '🐴' '🫎' '🫏' '🐎' '🦄' '🦓' '🦌' '🦬' '🐮' '🐂' '🐃' '🐄' '🐷' '🐖' '🐗' '🐽' '🐏' '🐑' '🐐' '🐪' '🐫' '🦙' '🦒' '🐘' '🦣' '🦏' '🦛' '🐭' '🐁' '🐀' '🐹' '🐰' '🐇' '🐿' '🦫' '🦔' '🦇' '🐻' '🐻‍❄️' '🐨' '🐼' '🦥' '🦦' '🦨' '🦘' '🦡' '🐾' '🦃' '🐔' '🐓' '🐣' '🐤' '🐥' '🐦' '🐧' '🕊' '🦅' '🦆' '🦢' '🦉' '🦤' '🪶' '🦩' '🦚' '🦜' '🪽' '🐦‍⬛' '🪿' '🐸' '🐊' '🐢' '🦎' '🐍' '🐲' '🐉' '🦕' '🦖' '🐳' '🐋' '🐬' '🦭' '🐟' '🐠' '🐡' '🦈' '🐙' '🐚' '🪸' '🪼' '🐌' '🦋' '🐛' '🐜' '🐝' '🪲' '🐞' '🦗' '🪳' '🕷' '🕸' '🦂' '🦟' '🪰' '🪱' '🦠' '💐' '🌸' '💮' '🪷' '🏵' '🌹' '🥀' '🌺' '🌻' '🌼' '🌷' '🪻' '🌱' '🪴' '🌲' '🌳' '🌴' '🌵' '🌾' '🌿' '☘' '🍀' '🍁' '🍂' '🍃' '🪹' '🪺' '🍄' '🍇' '🍈' '🍉' '🍊' '🍋' '🍌' '🍍' '🥭' '🍎' '🍏' '🍐' '🍑' '🍒' '🍓' '🫐' '🥝' '🍅' '🫒' '🥥' '🥑' '🍆' '🥔' '🥕' '🌽' '🌶' '🫑' '🥒' '🥬' '🥦' '🧄' '🧅' '🥜' '🫘' '🌰' '🫚' '🫛' '🍞' '🥐' '🥖' '🫓' '🥨' '🥯' '🥞' '🧇' '🧀' '🍖' '🍗' '🥩' '🥓' '🍔' '🍟' '🍕' '🌭' '🥪' '🌮' '🌯' '🫔' '🥙' '🧆' '🥚' '🍳' '🥘' '🍲' '🫕' '🥣' '🥗' '🍿' '🧈' '🧂' '🥫' '🍱' '🍘' '🍙' '🍚' '🍛' '🍜' '🍝' '🍠' '🍢' '🍣' '🍤' '🍥' '🥮' '🍡' '🥟' '🥠' '🥡' '🦀' '🦞' '🦐' '🦑' '🦪' '🍦' '🍧' '🍨' '🍩' '🍪' '🎂' '🍰' '🧁' '🥧' '🍫' '🍬' '🍭' '🍮' '🍯' '🍼' '🥛' '☕' '🫖' '🍵' '🍶' '🍾' '🍷' '🍸' '🍹' '🍺' '🍻' '🥂' '🥃' '🫗' '🥤' '🧋' '🧃' '🧉' '🧊' '🥢' '🍽' '🍴' '🥄' '🔪' '🫙' '🏺' '🌍' '🌎' '🌏' '🌐' '🗺' '🗾' '🧭' '🏔' '⛰' '🌋' '🗻' '🏕' '🏖' '🏜' '🏝' '🏞' '🏟' '🏛' '🏗' '🧱' '🪨' '🪵' '🛖' '🏘' '🏚' '🏠' '🏡' '🏢' '🏣' '🏤' '🏥' '🏦' '🏨' '🏩' '🏪' '🏫' '🏬' '🏭' '🏯' '🏰' '💒' '🗼' '🗽' '⛪' '🕌' '🛕' '🕍' '⛩' '🕋' '⛲' '⛺' '🌁' '🌃' '🏙' '🌄' '🌅' '🌆' '🌇' '🌉' '♨' '🎠' '🛝' '🎡' '🎢' '💈' '🎪' '🚂' '🚃' '🚄' '🚅' '🚆' '🚇' '🚈' '🚉' '🚊' '🚝' '🚞' '🚋' '🚌' '🚍' '🚎' '🚐' '🚑' '🚒' '🚓' '🚔' '🚕' '🚖' '🚗' '🚘' '🚙' '🛻' '🚚' '🚛' '🚜' '🏎' '🏍' '🛵' '🦽' '🦼' '🛺' '🚲' '🛴' '🛹' '🛼' '🚏' '🛣' '🛤' '🛢' '⛽' '🛞' '🚨' '🚥' '🚦' '🛑' '🚧' '⚓' '🛟' '⛵' '🛶' '🚤' '🛳' '⛴' '🛥' '🚢' '✈' '🛩' '🛫' '🛬' '🪂' '💺' '🚁' '🚟' '🚠' '🚡' '🛰' '🚀' '🛸' '🛎' '🧳' '⌛' '⏳' '⌚' '⏰' '⏱' '⏲' '🕰' '🕛' '🕧' '🕐' '🕜' '🕑' '🕝' '🕒' '🕞' '🕓' '🕟' '🕔' '🕠' '🕕' '🕡' '🕖' '🕢' '🕗' '🕣' '🕘' '🕤' '🕙' '🕥' '🕚' '🕦' '🌑' '🌒' '🌓' '🌔' '🌕' '🌖' '🌗' '🌘' '🌙' '🌚' '🌛' '🌜' '🌡' '☀' '🌝' '🌞' '🪐' '⭐' '🌟' '🌠' '🌌' '☁' '⛅' '⛈' '🌤' '🌥' '🌦' '🌧' '🌨' '🌩' '🌪' '🌫' '🌬' '🌀' '🌈' '🌂' '☂' '☔' '⛱' '⚡' '❄' '☃' '⛄' '☄' '🔥' '💧' '🌊' '🎃' '🎄' '🎆' '🎇' '🧨' '✨' '🎈' '🎉' '🎊' '🎋' '🎍' '🎎' '🎏' '🎐' '🎑' '🧧' '🎀' '🎁' '🎗' '🎟' '🎫' '🎖' '🏆' '🏅' '🥇' '🥈' '🥉' '⚽' '⚾' '🥎' '🏀' '🏐' '🏈' '🏉' '🎾' '🥏' '🎳' '🏏' '🏑' '🏒' '🥍' '🏓' '🏸' '🥊' '🥋' '🥅' '⛳' '⛸' '🎣' '🤿' '🎽' '🎿' '🛷' '🥌' '🎯' '🪀' '🪁' '🔫' '🎱' '🔮' '🪄' '🎮' '🕹' '🎰' '🎲' '🧩' '🧸' '🪅' '🪩' '🪆' '♠' '♥' '♦' '♣' '♟' '🃏' '🀄' '🎴' '🎭' '🖼' '🎨' '🧵' '🪡' '🧶' '🪢' '👓' '🕶' '🥽' '🥼' '🦺' '👔' '👕' '👖' '🧣' '🧤' '🧥' '🧦' '👗' '👘' '🥻' '🩱' '🩲' '🩳' '👙' '👚' '🪭' '👛' '👜' '👝' '🛍' '🎒' '🩴' '👞' '👟' '🥾' '🥿' '👠' '👡' '🩰' '👢' '🪮' '👑' '👒' '🎩' '🎓' '🧢' '🪖' '⛑' '📿' '💄' '💍' '💎' '🔇' '🔈' '🔉' '🔊' '📢' '📣' '📯' '🔔' '🔕' '🎼' '🎵' '🎶' '🎙' '🎚' '🎛' '🎤' '🎧' '📻' '🎷' '🪗' '🎸' '🎹' '🎺' '🎻' '🪕' '🥁' '🪘' '🪇' '🪈' '📱' '📲' '☎' '📞' '📟' '📠' '🔋' '🪫' '🔌' '💻' '🖥' '🖨' '⌨' '🖱' '🖲' '💽' '💾' '💿' '📀' '🧮' '🎥' '🎞' '📽' '🎬' '📺' '📷' '📸' '📹' '📼' '🔍' '🔎' '🕯' '💡' '🔦' '🏮' '🪔' '📔' '📕' '📖' '📗' '📘' '📙' '📚' '📓' '📒' '📃' '📜' '📄' '📰' '🗞' '📑' '🔖' '🏷' '💰' '🪙' '💴' '💵' '💶' '💷' '💸' '💳' '🧾' '💹' '✉' '📧' '📨' '📩' '📤' '📥' '📦' '📫' '📪' '📬' '📭' '📮' '🗳' '✏' '✒' '🖋' '🖊' '🖌' '🖍' '📝' '💼' '📁' '📂' '🗂' '📅' '📆' '🗒' '🗓' '📇' '📈' '📉' '📊' '📋' '📌' '📍' '📎' '🖇' '📏' '📐' '✂' '🗃' '🗄' '🗑' '🔒' '🔓' '🔏' '🔐' '🔑' '🗝' '🔨' '🪓' '⛏' '⚒' '🛠' '🗡' '⚔' '💣' '🪃' '🏹' '🛡' '🪚' '🔧' '🪛' '🔩' '⚙' '🗜' '⚖' '🦯' '🔗' '⛓' '🪝' '🧰' '🧲' '🪜' '⚗' '🧪' '🧫' '🧬' '🔬' '🔭' '📡' '💉' '🩸' '💊' '🩹' '🩼' '🩺' '🩻' '🚪' '🛗' '🪞' '🪟' '🛏' '🛋' '🪑' '🚽' '🪠' '🚿' '🛁' '🪤' '🪒' '🧴' '🧷' '🧹' '🧺' '🧻' '🪣' '🧼' '🫧' '🪥' '🧽' '🧯' '🛒' '🚬' '⚰' '🪦' '⚱' '🧿' '🪬' '🗿' '🪧' '🪪' '🏧' '🚮' '🚰' '♿' '🚹' '🚺' '🚻' '🚼' '🚾' '🛂' '🛃' '🛄' '🛅' '⚠' '🚸' '⛔' '🚫' '🚳' '🚭' '🚯' '🚱' '🚷' '📵' '🔞' '☢' '☣' '⬆' '↗' '➡' '↘' '⬇' '↙' '⬅' '↖' '↕' '↔' '↩' '↪' '⤴' '⤵' '🔃' '🔄' '🔙' '🔚' '🔛' '🔜' '🔝' '🛐' '⚛' '🕉' '✡' '☸' '☯' '✝' '☦' '☪' '☮' '🕎' '🔯' '🪯' '♈' '♉' '♊' '♋' '♌' '♍' '♎' '♏' '♐' '♑' '♒' '♓' '⛎' '🔀' '🔁' '🔂' '▶' '⏩' '⏭' '⏯' '◀' '⏪' '⏮' '🔼' '⏫' '🔽' '⏬' '⏸' '⏹' '⏺' '⏏' '🎦' '🔅' '🔆' '📶' '🛜' '📳' '📴' '♀' '♂' '⚧' '✖' '➕' '➖' '➗' '🟰' '♾' '‼' '⁉' '❓' '❔' '❕' '❗' '〰' '💱' '💲' '⚕' '♻' '⚜' '🔱' '📛' '🔰' '⭕' '✅' '☑' '✔' '❌' '❎' '➰' '➿' '〽' '✳' '✴' '❇' '©' '®' '™' '#️⃣' '*️⃣' '0️⃣' '1️⃣' '2️⃣' '3️⃣' '4️⃣' '5️⃣' '6️⃣' '7️⃣' '8️⃣' '9️⃣' '🔟' '🔠' '🔡' '🔢' '🔣' '🔤' '🅰' '🆎' '🅱' '🆑' '🆒' '🆓' 'ℹ' '🆔' 'Ⓜ' '🆕' '🆖' '🅾' '🆗' '🅿' '🆘' '🆙' '🆚' '🈁' '🈂' '🈷' '🈶' '🈯' '🉐' '🈹' '🈚' '🈲' '🉑' '🈸' '🈴' '🈳' '㊗' '㊙' '🈺' '🈵' '🔴' '🟠' '🟡' '🟢' '🔵' '🟣' '🟤' '⚫' '⚪' '🟥' '🟧' '🟨' '🟩' '🟦' '🟪' '🟫' '⬛' '⬜' '◼' '◻' '◾' '◽' '▪' '▫' '🔶' '🔷' '🔸' '🔹' '🔺' '🔻' '💠' '🔘' '🔳' '🔲' '🏁' '🚩' '🎌' '🏴' '🏳' '🏳️‍🌈' '🏳️‍⚧️' '🏴‍☠️' '🇦🇨' '🇦🇩' '🇦🇪' '🇦🇫' '🇦🇬' '🇦🇮' '🇦🇱' '🇦🇲' '🇦🇴' '🇦🇶' '🇦🇷' '🇦🇸' '🇦🇹' '🇦🇺' '🇦🇼' '🇦🇽' '🇦🇿' '🇧🇦' '🇧🇧' '🇧🇩' '🇧🇪' '🇧🇫' '🇧🇬' '🇧🇭' '🇧🇮' '🇧🇯' '🇧🇱' '🇧🇲' '🇧🇳' '🇧🇴' '🇧🇶' '🇧🇷' '🇧🇸' '🇧🇹' '🇧🇻' '🇧🇼' '🇧🇾' '🇧🇿' '🇨🇦' '🇨🇨' '🇨🇩' '🇨🇫' '🇨🇬' '🇨🇭' '🇨🇮' '🇨🇰' '🇨🇱' '🇨🇲' '🇨🇳' '🇨🇴' '🇨🇵' '🇨🇷' '🇨🇺' '🇨🇻' '🇨🇼' '🇨🇽' '🇨🇾' '🇨🇿' '🇩🇪' '🇩🇬' '🇩🇯' '🇩🇰' '🇩🇲' '🇩🇴' '🇩🇿' '🇪🇦' '🇪🇨' '🇪🇪' '🇪🇬' '🇪🇭' '🇪🇷' '🇪🇸' '🇪🇹' '🇪🇺' '🇫🇮' '🇫🇯' '🇫🇰' '🇫🇲' '🇫🇴' '🇫🇷' '🇬🇦' '🇬🇧' '🇬🇩' '🇬🇪' '🇬🇫' '🇬🇬' '🇬🇭' '🇬🇮' '🇬🇱' '🇬🇲' '🇬🇳' '🇬🇵' '🇬🇶' '🇬🇷' '🇬🇸' '🇬🇹' '🇬🇺' '🇬🇼' '🇬🇾' '🇭🇰' '🇭🇲' '🇭🇳' '🇭🇷' '🇭🇹' '🇭🇺' '🇮🇨' '🇮🇩' '🇮🇪' '🇮🇱' '🇮🇲' '🇮🇳' '🇮🇴' '🇮🇶' '🇮🇷' '🇮🇸' '🇮🇹' '🇯🇪' '🇯🇲' '🇯🇴' '🇯🇵' '🇰🇪' '🇰🇬' '🇰🇭' '🇰🇮' '🇰🇲' '🇰🇳' '🇰🇵' '🇰🇷' '🇰🇼' '🇰🇾' '🇰🇿' '🇱🇦' '🇱🇧' '🇱🇨' '🇱🇮' '🇱🇰' '🇱🇷' '🇱🇸' '🇱🇹' '🇱🇺' '🇱🇻' '🇱🇾' '🇲🇦' '🇲🇨' '🇲🇩' '🇲🇪' '🇲🇫' '🇲🇬' '🇲🇭' '🇲🇰' '🇲🇱' '🇲🇲' '🇲🇳' '🇲🇴' '🇲🇵' '🇲🇶' '🇲🇷' '🇲🇸' '🇲🇹' '🇲🇺' '🇲🇻' '🇲🇼' '🇲🇽' '🇲🇾' '🇲🇿' '🇳🇦' '🇳🇨' '🇳🇪' '🇳🇫' '🇳🇬' '🇳🇮' '🇳🇱' '🇳🇴' '🇳🇵' '🇳🇷' '🇳🇺' '🇳🇿' '🇴🇲' '🇵🇦' '🇵🇪' '🇵🇫' '🇵🇬' '🇵🇭' '🇵🇰' '🇵🇱' '🇵🇲' '🇵🇳' '🇵🇷' '🇵🇸' '🇵🇹' '🇵🇼' '🇵🇾' '🇶🇦' '🇷🇪' '🇷🇴' '🇷🇸' '🇷🇺' '🇷🇼' '🇸🇦' '🇸🇧' '🇸🇨' '🇸🇩' '🇸🇪' '🇸🇬' '🇸🇭' '🇸🇮' '🇸🇯' '🇸🇰' '🇸🇱' '🇸🇲' '🇸🇳' '🇸🇴' '🇸🇷' '🇸🇸' '🇸🇹' '🇸🇻' '🇸🇽' '🇸🇾' '🇸🇿' '🇹🇦' '🇹🇨' '🇹🇩' '🇹🇫' '🇹🇬' '🇹🇭' '🇹🇯' '🇹🇰' '🇹🇱' '🇹🇲' '🇹🇳' '🇹🇴' '🇹🇷' '🇹🇹' '🇹🇻' '🇹🇼' '🇹🇿' '🇺🇦' '🇺🇬' '🇺🇲' '🇺🇳' '🇺🇸' '🇺🇾' '🇺🇿' '🇻🇦' '🇻🇨' '🇻🇪' '🇻🇬' '🇻🇮' '🇻🇳' '🇻🇺' '🇼🇫' '🇼🇸' '🇽🇰' '🇾🇪' '🇾🇹' '🇿🇦' '🇿🇲' '🇿🇼' '🏴󠁧󠁢󠁥󠁮󠁧󠁿' '🏴󠁧󠁢󠁳󠁣󠁴󠁿' '🏴󠁧󠁢󠁷󠁬󠁳󠁿' ':art:' ':zap:' ':fire:' ':bug:' ':ambulance:' ':sparkles:' ':memo:' ':rocket:' ':lipstick:' ':tada:' ':white_check_mark:' ':lock:' ':closed_lock_with_key:' ':bookmark:' ':rotating_light:' ':construction:' ':green_heart:' ':arrow_down:' ':arrow_up:' ':pushpin:' ':construction_worker:' ':chart_with_upwards_trend:' ':recycle:' ':heavy_plus_sign:' ':heavy_minus_sign:' ':wrench:' ':hammer:' ':globe_with_meridians:' ':pencil2:' ':poop:' ':rewind:' ':twisted_rightwards_arrows:' ':package:' ':alien:' ':truck:' ':page_facing_up:' ':boom:' ':bento:' ':wheelchair:' ':bulb:' ':beers:' ':speech_balloon:' ':card_file_box:' ':loud_sound:' ':mute:' ':busts_in_silhouette:' ':children_crossing:' ':building_construction:' ':iphone:' ':clown_face:' ':egg:' ':see_no_evil:' ':camera_flash:' ':alembic:' ':mag:' ':label:' ':seedling:' ':triangular_flag_on_post:' ':goal_net:' ':dizzy:' ':wastebasket:' ':passport_control:' ':adhesive_bandage:' ':monocle_face:' ':coffin:' ':test_tube:' ':necktie:' ':stethoscope:' ':bricks:' ':technologist:' ':money_with_wings:' ':thread:' ':safety_vest:')

hasEmoji=0
for emoji in "${allSupportedEmojis[@]}"
do
	emojiLength=${#emoji}
	firstCharsOfWord=${firstWord:0:emojiLength}
	if [[ "$firstCharsOfWord" == "$emoji" ]]; then
		hasEmoji=1
	fi
done

printf '\n'

if [[ $hasEmoji == 0 ]]; then
	printf 'Commit message does not start with an emoji! If you are not sure which emoji would fit with your commit, take a look at https://gitmoji.dev. Both unicode emojis and Github emoji shortcodes are valid 🤘. '
	exit 1
fi

if [[ $hasEmoji == 1 ]]; then
	printf "\e[32;1m%s\e[0m\n" 'Thank you for using an emoji in your commit message 🥳.'
fi