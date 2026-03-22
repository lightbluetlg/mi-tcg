var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r},n={current:`menu`,params:{},listeners:[],go(e,t={}){let n=document.querySelector(`#app`);n?(n.style.transition=`opacity 0.2s ease, transform 0.2s ease`,n.style.pointerEvents=`none`,n.style.opacity=`0`,n.style.transform=`translateY(-6px)`,setTimeout(()=>{n.style.transition=``,n.style.opacity=``,n.style.transform=``,n.style.pointerEvents=``,this.current=e,this.params=t,this.listeners.forEach(n=>n(e,t))},220)):(this.current=e,this.params=t,this.listeners.forEach(n=>n(e,t)))},onChange(e){this.listeners.push(e)}},r=[{id:1,name:`Animated Bones`,image:`Animated_Bones.webp`,mana:2,attack:1,hp:3,rarity:`uncommon`,keywords:[],lore:`No grave in Ravendawn stays quiet for long.`},{id:2,name:`Astor Demon`,image:`Astor_demon.webp`,mana:5,attack:5,hp:4,rarity:`epic`,keywords:[`Apex`],lore:`Summoned from the rifts beneath Ravencrest, it hungers for souls it was never given.`},{id:3,name:`Bat`,image:`Bat.webp`,mana:1,attack:1,hp:1,rarity:`uncommon`,keywords:[`Ambush`],lore:`In the dark alleys of Ravencrest, they are someone's eyes.`},{id:4,name:`Battlehog`,image:`Battlehog.webp`,mana:3,attack:4,hp:2,rarity:`rare`,keywords:[`Ambush`],lore:`Bred for the pits, it charges before the bell even rings.`},{id:5,name:`Bee`,image:`Bee.webp`,mana:1,attack:2,hp:1,rarity:`uncommon`,keywords:[`Ambush`],lore:`Small enough to ignore, fast enough to regret.`},{id:6,name:`Blackarmor Widow`,image:`Blackarmor_widow.webp`,mana:4,attack:3,hp:4,rarity:`rare`,keywords:[],lore:`She buried three husbands and wore their armor to the fourth wedding.`},{id:7,name:`Blademaster Djinn`,image:`Blademaster_Djinn.webp`,mana:6,attack:6,hp:5,rarity:`epic`,keywords:[`Ambush`],lore:`Bound by no contract, it cuts through flesh and agreement alike.`},{id:8,name:`Blizzard Beast`,image:`Blizzard_Beast.webp`,mana:5,attack:5,hp:5,rarity:`epic`,keywords:[`Warden`],lore:`Nothing passes through the northern passes while the Blizzard Beast still breathes.`},{id:9,name:`Bloodthirsty Kaiman`,image:`Bloodthirsty_Kaiman.webp`,mana:4,attack:5,hp:3,rarity:`rare`,keywords:[`Leech`],lore:`It doesn't fight to win — it fights to feed.`},{id:10,name:`Boar Runt`,image:`Boar_Runt.webp`,mana:1,attack:2,hp:1,rarity:`uncommon`,keywords:[`Ambush`],lore:`The runt of the litter, but the first one through the door.`},{id:11,name:`Bog Spider`,image:`Bog_Spider.webp`,mana:2,attack:2,hp:2,rarity:`uncommon`,keywords:[],lore:`The bogs south of Ravencrest are thick with webs and thicker with silence.`},{id:12,name:`Bog Spiderling`,image:`Bog_Spiderling.webp`,mana:1,attack:1,hp:2,rarity:`uncommon`,keywords:[],lore:`Hundreds hatch for every one that survives — and that's enough.`},{id:13,name:`Bone Gazer`,image:`Bone_Gazer.webp`,mana:3,attack:2,hp:4,rarity:`uncommon`,keywords:[`Omen`],lore:`It reads the future in the marrow of the dead.`},{id:14,name:`Borogorom`,image:`Borogorom.webp`,mana:8,attack:8,hp:8,rarity:`legendary`,keywords:[`Warden`,`Apex`],lore:`Ancient beyond memory, Borogorom was old when Ravendawn was still nameless.`},{id:15,name:`Brotherhood Captain`,image:`Brotherhood_Captain.webp`,mana:4,attack:4,hp:4,rarity:`rare`,keywords:[`Warden`],lore:`No Brotherhood soldier falls while their captain still stands.`},{id:16,name:`Brotherhood Marksman`,image:`Brotherhood_marksman.webp`,mana:3,attack:4,hp:2,rarity:`uncommon`,keywords:[],lore:`Three hundred paces, one breath, one shot — he never misses the second time.`},{id:17,name:`Brotherhood Mender`,image:`Brotherhood_Mender.webp`,mana:2,attack:1,hp:4,rarity:`uncommon`,keywords:[],lore:`She patches wounds with one hand and keeps secrets with the other.`},{id:18,name:`Brotherhood Sorcerer`,image:`Brotherhood_Sorcerer.webp`,mana:4,attack:3,hp:4,rarity:`rare`,keywords:[`Omen`],lore:`The Brotherhood does not trust magic — but they trust him.`},{id:19,name:`Brotherhood Swordsman`,image:`Brotherhood_Swordsman.webp`,mana:2,attack:3,hp:2,rarity:`uncommon`,keywords:[],lore:`Trained in the gutters of Ravencrest, refined in its wars.`},{id:20,name:`Brotherhood Tracker`,image:`Brotherhood_tracker.webp`,mana:3,attack:3,hp:3,rarity:`uncommon`,keywords:[`Ambush`],lore:`By the time you notice his tracks, he's already behind you.`},{id:21,name:`Captain Boone`,image:`Captain_Boone.webp`,mana:6,attack:5,hp:6,rarity:`legendary`,keywords:[`Ambush`,`Apex`],lore:`Every port in Ravendawn has a bounty on Boone — none have collected.`},{id:22,name:`Cave Spider`,image:`Cave_Spider.webp`,mana:2,attack:2,hp:3,rarity:`uncommon`,keywords:[],lore:`The caves beneath Ravencrest belong to them, not to us.`},{id:23,name:`Chainwraith Creep`,image:`Chainwraith_Creep.webp`,mana:2,attack:2,hp:2,rarity:`uncommon`,keywords:[`Ambush`],lore:`It drags its chains not as a burden, but as a weapon.`},{id:24,name:`Chainwraith Haunt`,image:`Chainwraith_haunt.webp`,mana:3,attack:3,hp:3,rarity:`rare`,keywords:[`Ambush`,`Hollow`],lore:`Even in death, a Chainwraith refuses to let go.`},{id:25,name:`Chainwraith Prowler`,image:`Chainwraith_Prowler.webp`,mana:4,attack:4,hp:3,rarity:`rare`,keywords:[`Ambush`],lore:`It moves without sound despite the iron links — that is what makes it terrifying.`},{id:26,name:`Coal Contraption`,image:`Coal_Contraption.webp`,mana:3,attack:3,hp:4,rarity:`uncommon`,keywords:[],lore:`Built in a Ravencrest foundry, fueled by spite and cheap coal.`},{id:27,name:`Coldstone Cub`,image:`Coldstone_Cub.webp`,mana:2,attack:2,hp:3,rarity:`uncommon`,keywords:[],lore:`Cute now — check back when it's full grown.`},{id:28,name:`Contagious Sporewalker`,image:`Contagious_Sporewalker.webp`,mana:3,attack:2,hp:5,rarity:`rare`,keywords:[`Hollow`],lore:`It spreads itself across Ravendawn one spore at a time.`},{id:29,name:`Crowman`,image:`Crowman.webp`,mana:3,attack:3,hp:3,rarity:`uncommon`,keywords:[`Omen`],lore:`The crows told him something this morning — he hasn't spoken since.`},{id:30,name:`Crow Matriarch`,image:`Crow_Matriarch.webp`,mana:5,attack:4,hp:5,rarity:`epic`,keywords:[`Omen`,`Warden`],lore:`She has watched Ravencrest rise and burn and rise again — and she is patient.`},{id:31,name:`Direhorn Drake`,image:`Direhorn_Drake.webp`,mana:6,attack:6,hp:6,rarity:`epic`,keywords:[`Apex`],lore:`Its horn splits stone — heroes fare no better.`},{id:32,name:`Dire Bear`,image:`Dire_Bear.webp`,mana:5,attack:6,hp:5,rarity:`rare`,keywords:[`Warden`],lore:`The forest does not need walls while the Dire Bear still walks it.`},{id:33,name:`Dire Wolf`,image:`Dire_Wolf.webp`,mana:3,attack:4,hp:3,rarity:`uncommon`,keywords:[`Ambush`],lore:`It never hunts alone — the others are just harder to see.`},{id:34,name:`Doom Gazer`,image:`Doom_Gazer.webp`,mana:5,attack:4,hp:6,rarity:`epic`,keywords:[`Omen`],lore:`It does not predict doom — it simply watches it approach.`},{id:35,name:`Draconic Crusader`,image:`Draconic_Crusader.webp`,mana:5,attack:5,hp:5,rarity:`epic`,keywords:[`Warden`],lore:`Sworn to a dragon long dead, the crusade never ended.`},{id:36,name:`Draconic Pyromancer`,image:`Draconic_Pyromancer.webp`,mana:4,attack:5,hp:3,rarity:`rare`,keywords:[`Apex`],lore:`She doesn't aim at soldiers — she aims at the ground beneath them.`},{id:37,name:`Dwarf Commoner`,image:`Dwarf_Commoner.webp`,mana:1,attack:1,hp:3,rarity:`uncommon`,keywords:[],lore:`Tougher than he looks — most dwarves are.`},{id:38,name:`Dwarf Elementalist`,image:`Dwarf_elementalist.webp`,mana:4,attack:3,hp:5,rarity:`rare`,keywords:[],lore:`He argues that stone and fire are the same thing — just a matter of patience.`},{id:39,name:`Dwarf Legionnaire`,image:`Dwarf_Legionnaire.webp`,mana:3,attack:3,hp:4,rarity:`uncommon`,keywords:[`Warden`],lore:`The dwarven legions held the Ravencrest gates for forty days without relief.`},{id:40,name:`Dwarf Mechanic`,image:`Dwarf_Mechanic.webp`,mana:2,attack:2,hp:3,rarity:`uncommon`,keywords:[],lore:`If it's broken, she'll fix it — if it's not broken, she'll improve it anyway.`},{id:41,name:`Dwarf Prospector`,image:`Dwarf_Prospector.webp`,mana:2,attack:2,hp:2,rarity:`uncommon`,keywords:[],lore:`He came to Ravendawn for gold and found something far older.`},{id:42,name:`Dwarf Thunderer`,image:`Dwarf_Thunderer.webp`,mana:4,attack:4,hp:3,rarity:`rare`,keywords:[`Apex`],lore:`The thunder you hear is his warning shot.`},{id:43,name:`Dwarf Warrior`,image:`Dwarf_Warrior.webp`,mana:2,attack:3,hp:2,rarity:`uncommon`,keywords:[],lore:`Short in stature, long in fury.`},{id:44,name:`Elderwood Goliath`,image:`Elderwood_goliath.webp`,mana:7,attack:7,hp:7,rarity:`legendary`,keywords:[`Warden`,`Hollow`],lore:`The oldest tree in Ravendawn learned to walk — and then learned to fight.`},{id:45,name:`Elf Assassin`,image:`Elf_Assassin.webp`,mana:4,attack:5,hp:2,rarity:`rare`,keywords:[`Ambush`],lore:`She was never in the room — and yet the contract was always fulfilled.`},{id:46,name:`Elf Bowman`,image:`Elf_Bowman.webp`,mana:2,attack:3,hp:1,rarity:`uncommon`,keywords:[],lore:`Elven archers don't waste arrows — or words.`},{id:47,name:`Elf Druid`,image:`Elf_Druid.webp`,mana:3,attack:2,hp:4,rarity:`uncommon`,keywords:[`Omen`],lore:`The roots of Ravendawn whisper constantly — she is one of the few who listens.`},{id:48,name:`Emberglow Trunk`,image:`Emberglow_Trunk.webp`,mana:4,attack:3,hp:6,rarity:`rare`,keywords:[`Warden`],lore:`It has stood at the edge of the Ember Fields for centuries, unmoved and unmovable.`},{id:49,name:`Emberscale Drake`,image:`Emberscale_Drake.webp`,mana:6,attack:6,hp:5,rarity:`epic`,keywords:[`Apex`],lore:`Its scales glow like cooling lava — right before they stop cooling.`},{id:50,name:`Flamelord Djinn`,image:`Flamelord_Djinn.webp`,mana:7,attack:7,hp:6,rarity:`legendary`,keywords:[`Apex`,`Ambush`],lore:`Ravencrest burned once before — those who summoned the Flamelord did not survive to explain why.`},{id:51,name:`Forest Spider`,image:`Forest_Spider.webp`,mana:2,attack:2,hp:2,rarity:`uncommon`,keywords:[],lore:`The forests of Ravendawn are beautiful — and full of these.`},{id:52,name:`Froll Cryomancer`,image:`Froll_Cryomancer.webp`,mana:5,attack:4,hp:5,rarity:`epic`,keywords:[],lore:`The Froll learned magic from the glaciers — slow, cold, and absolute.`},{id:53,name:`Froll Gladiator`,image:`Froll_Gladiator.webp`,mana:4,attack:5,hp:3,rarity:`rare`,keywords:[`Ambush`],lore:`He fought in the Ravencrest pits for ten years — he chose to stay for ten more.`},{id:54,name:`Frostbound Drake`,image:`Frostbound_Drake.webp`,mana:5,attack:5,hp:5,rarity:`epic`,keywords:[`Warden`],lore:`Bound in ice by an ancient curse, it guards what it can no longer remember.`},{id:55,name:`Frostrisen Magus`,image:`Frostrisen_Magus.webp`,mana:4,attack:3,hp:5,rarity:`rare`,keywords:[`Omen`],lore:`He rose from his own frozen tomb with knowledge no living mage should possess.`},{id:56,name:`Frostrisen Shardshooter`,image:`Frostrisen_Shardshooter.webp`,mana:3,attack:4,hp:2,rarity:`uncommon`,keywords:[],lore:`Ice shards don't need to be aimed — they need to be everywhere.`},{id:57,name:`Ghaz Archer`,image:`Ghaz_Archer.webp`,mana:2,attack:3,hp:2,rarity:`uncommon`,keywords:[],lore:`The Ghaz don't miss — they just sometimes aim at unexpected things.`},{id:58,name:`Ghaz Dino Raider`,image:`Ghaz_Dino_Raider.webp`,mana:5,attack:5,hp:4,rarity:`epic`,keywords:[`Ambush`],lore:`He arrived at the gates of Ravencrest on the back of something that hadn't been seen in a thousand years.`},{id:59,name:`Ghaz Sandbender`,image:`Ghaz_Sandbender.webp`,mana:3,attack:3,hp:4,rarity:`rare`,keywords:[],lore:`The desert has no walls — she makes them when she needs them.`},{id:60,name:`Ghostlamp Hag`,image:`Ghostlamp_Hag.webp`,mana:4,attack:3,hp:5,rarity:`rare`,keywords:[`Omen`],lore:`Follow her lamp and you'll find answers — just not ones you wanted.`},{id:61,name:`Glutton Hag`,image:`Glutton_hag.webp`,mana:4,attack:4,hp:4,rarity:`rare`,keywords:[`Leech`],lore:`She doesn't eat to survive — she survives to eat.`},{id:62,name:`Goblin Berserker`,image:`Goblin_Berserker.webp`,mana:2,attack:3,hp:1,rarity:`uncommon`,keywords:[`Ambush`],lore:`Pain is just information — and he stopped listening to it years ago.`},{id:63,name:`Goblin Bomber`,image:`Goblin_Bomber.webp`,mana:3,attack:4,hp:2,rarity:`uncommon`,keywords:[`Ambush`],lore:`He's very good at his job — the life expectancy is just unfortunate.`},{id:64,name:`Goblin Glider`,image:`Goblin_Glider.webp`,mana:2,attack:2,hp:2,rarity:`uncommon`,keywords:[`Ambush`],lore:`He built the glider himself — which explains both the speed and the screaming.`},{id:65,name:`Goblin Pyro`,image:`Goblin_Pyro.webp`,mana:3,attack:4,hp:2,rarity:`rare`,keywords:[`Apex`],lore:`Ravencrest's fire marshal has a wanted poster with his face on every corner.`},{id:66,name:`Goblin Tinker`,image:`Goblin_Tinker.webp`,mana:2,attack:2,hp:3,rarity:`uncommon`,keywords:[],lore:`It doesn't work yet — but give him five minutes and something will explode.`},{id:67,name:`Goblin Wizard`,image:`Goblin_Wizard.webp`,mana:3,attack:3,hp:3,rarity:`rare`,keywords:[`Omen`],lore:`He learned magic from a stolen spellbook — most of it correctly.`},{id:68,name:`Golden Guardian`,image:`Golden_Guardian.webp`,mana:7,attack:6,hp:8,rarity:`legendary`,keywords:[`Warden`],lore:`Forged in Ravencrest's golden age, it has outlasted every king it was made to protect.`},{id:69,name:`Grey Wolf`,image:`Grey_Wolf.webp`,mana:2,attack:3,hp:2,rarity:`uncommon`,keywords:[`Ambush`],lore:`The grey ones are always the pack leaders — always.`},{id:70,name:`Harvester Hag`,image:`Harvester_Hag.webp`,mana:3,attack:3,hp:4,rarity:`rare`,keywords:[`Leech`],lore:`She takes a little from everything — eventually, nothing is left.`},{id:71,name:`Hell Gazer`,image:`Hell_Gazer.webp`,mana:5,attack:5,hp:5,rarity:`epic`,keywords:[`Omen`,`Apex`],lore:`It stares into the abyss of Ravendawn — and the abyss has learned to look away.`},{id:72,name:`Hierophant Sigrid`,image:`Hierophant_Sigrid.webp`,mana:7,attack:5,hp:8,rarity:`legendary`,keywords:[`Warden`,`Omen`],lore:`Sigrid has held the faith of Ravendawn together through three collapses — she will hold it through a fourth.`},{id:73,name:`High Elf Champion`,image:`High_Elf_Champion.webp`,mana:5,attack:5,hp:4,rarity:`epic`,keywords:[`Ambush`],lore:`She fights with the grace of a dancer and the efficiency of an executioner.`},{id:74,name:`High Elf Priestess`,image:`high_elf_priestess.webp`,mana:4,attack:3,hp:5,rarity:`rare`,keywords:[`Omen`],lore:`Her prayers reach further than any arrow — and land harder.`},{id:75,name:`Hobgoblin`,image:`Hobgoblin.webp`,mana:2,attack:2,hp:3,rarity:`uncommon`,keywords:[],lore:`Bigger than a goblin, meaner than most things twice his size.`},{id:76,name:`Hoghound Archer`,image:`Hoghound_archer.webp`,mana:3,attack:4,hp:2,rarity:`uncommon`,keywords:[],lore:`He aims for the gaps in the armor — there are always gaps.`},{id:77,name:`Hoghound Raider`,image:`Hoghound_Raider.webp`,mana:3,attack:3,hp:3,rarity:`uncommon`,keywords:[`Ambush`],lore:`The Hoghound raids come before dawn — by sunrise, there is nothing left to raid.`},{id:78,name:`Hoghound Shaman`,image:`Hoghound_Shaman.webp`,mana:4,attack:3,hp:4,rarity:`rare`,keywords:[`Omen`],lore:`The bones he reads are always fresh — he makes sure of it.`},{id:79,name:`Hoglet`,image:`Hoglet.webp`,mana:1,attack:1,hp:2,rarity:`uncommon`,keywords:[],lore:`Don't let the size fool you — it bites.`},{id:80,name:`Hog Cultist`,image:`Hog_Cultist.webp`,mana:2,attack:2,hp:3,rarity:`uncommon`,keywords:[],lore:`He gave up a normal life for the cult — he doesn't miss it.`},{id:81,name:`Hog Saboteur`,image:`Hog_Saboteur.webp`,mana:3,attack:3,hp:3,rarity:`rare`,keywords:[`Ambush`],lore:`By the time the trap is found, he's already set three more.`},{id:82,name:`Hog Warlord`,image:`Hog_Warlord.webp`,mana:5,attack:6,hp:4,rarity:`epic`,keywords:[`Ambush`,`Apex`],lore:`He united the Hog clans through war — and kept them united through fear.`},{id:83,name:`Hookmask Doctor`,image:`Hookmask_Doctor.webp`,mana:3,attack:2,hp:4,rarity:`rare`,keywords:[],lore:`He heals only those worth keeping alive — his definition of worth is flexible.`},{id:84,name:`Hookmask Killer`,image:`Hookmask_Killer.webp`,mana:4,attack:5,hp:3,rarity:`rare`,keywords:[`Ambush`],lore:`The mask is not to hide his face — it's to hide his smile.`},{id:85,name:`Hookmask Knave`,image:`Hookmask_Knave.webp`,mana:2,attack:3,hp:2,rarity:`uncommon`,keywords:[`Ambush`],lore:`A thief in Ravencrest's lower districts, quick enough to stay breathing.`},{id:86,name:`Hookmask Slinger`,image:`Hookmask_Slinger.webp`,mana:2,attack:3,hp:2,rarity:`uncommon`,keywords:[],lore:`The hook always comes back — usually with something attached.`},{id:87,name:`Iceforge Frostcaller`,image:`Iceforge_frostcaller.webp`,mana:4,attack:3,hp:5,rarity:`rare`,keywords:[],lore:`She calls the frost the way others call for silence — and it always answers.`},{id:88,name:`Iceforge Hallkeeper`,image:`Iceforge_Hallkeeper.webp`,mana:3,attack:2,hp:5,rarity:`uncommon`,keywords:[`Warden`],lore:`The Iceforge halls have never been breached — he intends to keep it that way.`},{id:89,name:`Iceforge Hunter`,image:`Iceforge_Hunter.webp`,mana:3,attack:4,hp:3,rarity:`uncommon`,keywords:[`Ambush`],lore:`He tracks prey across frozen tundra for weeks — patience is his sharpest weapon.`},{id:90,name:`Iceforge Stormgunner`,image:`Iceforge_Stormgunner.webp`,mana:4,attack:4,hp:4,rarity:`rare`,keywords:[],lore:`The Iceforge cannon was his idea — everyone else called it impossible.`},{id:91,name:`Iceforge Winterlord`,image:`Iceforge_Winterlord.webp`,mana:6,attack:5,hp:7,rarity:`epic`,keywords:[`Warden`],lore:`He does not fight for Ravendawn — Ravendawn fights because of him.`},{id:92,name:`Iceshell Giant`,image:`Iceshell_Giant.webp`,mana:6,attack:5,hp:8,rarity:`epic`,keywords:[`Warden`],lore:`Its shell has stopped siege weapons — arrows are an insult.`},{id:93,name:`Icicle Gazer`,image:`Icicle_Gazer.webp`,mana:4,attack:3,hp:6,rarity:`rare`,keywords:[`Omen`],lore:`It sees the future in the cracks of ice — and the future is always cold.`},{id:94,name:`Kaiman Ambusher`,image:`Kaiman_Ambusher.webp`,mana:3,attack:4,hp:2,rarity:`uncommon`,keywords:[`Ambush`],lore:`Still as a log, fast as a nightmare.`},{id:95,name:`Kaiman Illusionist`,image:`Kaiman_Illusionist.webp`,mana:5,attack:4,hp:5,rarity:`epic`,keywords:[`Omen`],lore:`He shows you what you fear — then stands behind it.`},{id:96,name:`Kaiman Seer`,image:`Kaiman_Seer.webp`,mana:3,attack:2,hp:4,rarity:`uncommon`,keywords:[`Omen`],lore:`The swamps of Ravendawn speak to those patient enough to sink in them.`},{id:97,name:`Manastorm Djinn`,image:`Manastorm_Djinn.webp`,mana:6,attack:6,hp:5,rarity:`epic`,keywords:[`Apex`],lore:`Born from a ruptured ley line, it is a storm given ambition.`},{id:98,name:`Many-eyes Trunk`,image:`Many-eyes_Trunk.webp`,mana:5,attack:4,hp:6,rarity:`rare`,keywords:[`Omen`,`Warden`],lore:`Nothing moves through the deep forest without every eye turning toward it.`},{id:99,name:`Mindslave Taskmaster`,image:`Mindslave_Taskmaster.webp`,mana:5,attack:5,hp:4,rarity:`epic`,keywords:[`Omen`],lore:`He doesn't give orders — he plants them, like seeds, where they will grow unnoticed.`},{id:100,name:`Minotaur Arbalist`,image:`Minotaur_Arbalist.webp`,mana:3,attack:4,hp:3,rarity:`uncommon`,keywords:[],lore:`The crossbow was built for a smaller hand — he uses it anyway.`},{id:101,name:`Minotaur Champion`,image:`Minotaur_Champion.webp`,mana:5,attack:6,hp:5,rarity:`epic`,keywords:[`Warden`,`Apex`],lore:`He has fought in every war Ravendawn has seen — and started a few of his own.`},{id:102,name:`Minotaur Duelist`,image:`Minotaur_Duelist.webp`,mana:3,attack:4,hp:3,rarity:`rare`,keywords:[`Ambush`],lore:`He challenged the Ravencrest arena champion — the fight lasted four seconds.`},{id:103,name:`Minotaur Warden`,image:`Minotaur_Warden.webp`,mana:4,attack:3,hp:6,rarity:`rare`,keywords:[`Warden`],lore:`He was placed at this post an age ago — he is still waiting for relief.`},{id:104,name:`Mistycap Mushroom`,image:`Mistycap_Mushroom.webp`,mana:2,attack:1,hp:4,rarity:`uncommon`,keywords:[`Hollow`],lore:`It releases spores when it dies — that is when it becomes dangerous.`},{id:105,name:`Moonblade Jackal`,image:`Moonblade_Jackal.webp`,mana:3,attack:4,hp:2,rarity:`uncommon`,keywords:[`Ambush`],lore:`It hunts only at night — the blade glows so you know it's coming.`},{id:106,name:`Morningfox Cub`,image:`Morningfox_Cub.webp`,mana:1,attack:1,hp:2,rarity:`uncommon`,keywords:[],lore:`Small, golden, and already trouble.`},{id:107,name:`Morningfox Ninetails`,image:`Morningfox_Ninetails.webp`,mana:6,attack:5,hp:6,rarity:`legendary`,keywords:[`Omen`,`Leech`],lore:`Each tail holds a secret — she has nine, and none of them are kind.`},{id:108,name:`Morningstar Bishop`,image:`Morningstar_Bishop.webp`,mana:5,attack:4,hp:6,rarity:`epic`,keywords:[`Warden`,`Leech`],lore:`His faith sustains him — and drains everyone who stands against him.`},{id:109,name:`Morningstar Flagellant`,image:`Morningstar_Flagellant.webp`,mana:3,attack:4,hp:3,rarity:`rare`,keywords:[`Leech`],lore:`Every wound he takes makes him stronger — he prays for pain.`},{id:110,name:`Morningstar Hermit`,image:`Morningstar_Hermit.webp`,mana:2,attack:2,hp:3,rarity:`uncommon`,keywords:[],lore:`He left Ravencrest for solitude — solitude disagreed.`},{id:111,name:`Morningstar Judge`,image:`Morningstar_Judge.webp`,mana:6,attack:5,hp:7,rarity:`legendary`,keywords:[`Warden`,`Apex`],lore:`His verdicts are final — Ravendawn has never overturned one.`},{id:112,name:`Morningstar Paladin`,image:`Morningstar_Paladin.webp`,mana:4,attack:4,hp:5,rarity:`rare`,keywords:[`Warden`],lore:`The light he carries is not mercy — it is warning.`},{id:113,name:`Naturalist Mage`,image:`Naturalist_Mage.webp`,mana:3,attack:3,hp:4,rarity:`uncommon`,keywords:[],lore:`He studies Ravendawn's wild magic not to control it — to survive it.`},{id:114,name:`Naturalist Praiser`,image:`Naturalist_Praiser.webp`,mana:2,attack:2,hp:3,rarity:`uncommon`,keywords:[],lore:`He sings to the land of Ravendawn — and sometimes it sings back.`},{id:115,name:`Orc Chieftain`,image:`Orc_Chieftain.webp`,mana:6,attack:6,hp:6,rarity:`epic`,keywords:[`Warden`,`Ambush`],lore:`He leads from the front — the screaming is so his warriors know where to follow.`},{id:116,name:`Orc Nightstar`,image:`Orc_Nightstar.webp`,mana:4,attack:5,hp:3,rarity:`rare`,keywords:[`Ambush`],lore:`She strikes when the stars are right — they are always right.`},{id:117,name:`Orc Spellcaster`,image:`Orc_spellcaster.webp`,mana:3,attack:3,hp:4,rarity:`uncommon`,keywords:[],lore:`The other orcs think magic is weakness — he's stopped correcting them.`},{id:118,name:`Orc Witchdoctor`,image:`Orc_Witchdoctor.webp`,mana:4,attack:3,hp:5,rarity:`rare`,keywords:[`Omen`],lore:`His remedies work — eventually, and on their own terms.`},{id:119,name:`Pearlshell Giant`,image:`Pearlshell_Giant.webp`,mana:7,attack:6,hp:8,rarity:`legendary`,keywords:[`Warden`],lore:`It rose from the depths of Ravendawn's sea and has not returned — it prefers it here.`},{id:120,name:`Phoenix`,image:`Phoenix.webp`,mana:7,attack:7,hp:6,rarity:`legendary`,keywords:[`Hollow`,`Apex`],lore:`Ravendawn has watched it die and return seven times — it is never happy to be back.`},{id:121,name:`Pirate Cannoneer`,image:`Pirate_Cannoneer.webp`,mana:4,attack:5,hp:2,rarity:`epic`,keywords:[`Apex`],lore:`She doesn't aim at ships — she aims through them.`},{id:122,name:`Pirate Freebooter`,image:`Pirate_freebooter.webp`,mana:2,attack:3,hp:2,rarity:`uncommon`,keywords:[`Ambush`],lore:`No allegiance, no port, no problem.`},{id:123,name:`Pirate Swashbuckler`,image:`Pirate_Swashbuckler.webp`,mana:3,attack:4,hp:2,rarity:`rare`,keywords:[`Ambush`],lore:`He fights like he dances — badly, recklessly, and somehow winning.`},{id:124,name:`Poisonpetal Goliath`,image:`Poisonpetal_goliath.webp`,mana:7,attack:6,hp:7,rarity:`legendary`,keywords:[`Warden`,`Hollow`],lore:`Even in death the Poisonpetal Goliath poisons the land around it for a generation.`},{id:125,name:`Poisonpetal Lotus`,image:`Poisonpetal_Lotus.webp`,mana:3,attack:2,hp:5,rarity:`uncommon`,keywords:[`Hollow`],lore:`It blooms once, beautifully, and then the dying begins.`},{id:126,name:`Polar Bear`,image:`Polar_Bear.webp`,mana:3,attack:3,hp:4,rarity:`rare`,keywords:[`Warden`],lore:`The northern wastes belong to it — all travelers are guests, not trespassers.`},{id:127,name:`Pummeldillo Boxer`,image:`Pummeldillo_Boxer.webp`,mana:3,attack:4,hp:3,rarity:`rare`,keywords:[],lore:`The shell is just armor — the fists are the problem.`},{id:128,name:`Queen Snow Spider`,image:`Queen snow spider.webp`,mana:6,attack:5,hp:7,rarity:`legendary`,keywords:[`Hollow`,`Omen`],lore:`When the Queen dies, ten thousand children are already waiting to inherit her web.`},{id:129,name:`Rargum the Dread`,image:`Rargum_the_Dread.webp`,mana:7,attack:7,hp:6,rarity:`legendary`,keywords:[`Apex`,`Ambush`],lore:`Ravencrest closed its gates the day Rargum was spotted on the horizon — it wasn't enough.`},{id:130,name:`Rat Burglar`,image:`Rat_burglar.webp`,mana:1,attack:2,hp:1,rarity:`uncommon`,keywords:[`Ambush`],lore:`He was in and out of Ravencrest's treasury before the guards changed shift.`},{id:131,name:`Rat Scavenger`,image:`Rat_Scavenger.webp`,mana:1,attack:1,hp:2,rarity:`uncommon`,keywords:[],lore:`After every battle in Ravendawn, the scavengers arrive.`},{id:132,name:`Rat Spiketail`,image:`Rat_spiketail.webp`,mana:2,attack:2,hp:2,rarity:`uncommon`,keywords:[],lore:`The tail is not decorative.`},{id:133,name:`Rubycap Mushroom`,image:`Rubycap_Mushroom.webp`,mana:2,attack:2,hp:3,rarity:`uncommon`,keywords:[`Hollow`],lore:`As red as a warning, as stubborn as stone.`},{id:134,name:`Runegust Jackal`,image:`Runegust_jackal.webp`,mana:3,attack:3,hp:3,rarity:`rare`,keywords:[],lore:`The runes on its fur were not put there by any scholar still living.`},{id:135,name:`Saltdusk Bloodmage`,image:`Saltdusk_Bloodmage.webp`,mana:5,attack:5,hp:4,rarity:`epic`,keywords:[`Leech`,`Apex`],lore:`He draws power from wounds — his enemies provide plenty.`},{id:136,name:`Saltdusk Cutthroat`,image:`Saltdusk_Cutthroat.webp`,mana:3,attack:4,hp:2,rarity:`uncommon`,keywords:[`Ambush`],lore:`The Saltdusk quarter of Ravencrest doesn't have a graveyard — bodies just disappear.`},{id:137,name:`Saltdusk Executioner`,image:`Saltdusk_Executioner.webp`,mana:5,attack:6,hp:4,rarity:`epic`,keywords:[`Ambush`],lore:`He was hired by the city — then by those the city wanted silenced.`},{id:138,name:`Saltdusk Ritualist`,image:`Saltdusk_Ritualist.webp`,mana:4,attack:3,hp:5,rarity:`rare`,keywords:[`Leech`,`Omen`],lore:`She reads futures in blood — preferably someone else's.`},{id:139,name:`Sandwatcher Jackal`,image:`Sandwatcher_Jackal.webp`,mana:2,attack:3,hp:2,rarity:`uncommon`,keywords:[],lore:`It watches from the dunes with patience that outlasts empires.`},{id:140,name:`Saurian Monitor`,image:`Saurian_Monitor.webp`,mana:3,attack:3,hp:4,rarity:`uncommon`,keywords:[],lore:`Ancient and reptilian, it remembers Ravendawn before the first stone was laid.`},{id:141,name:`Saurian Scaleshield`,image:`Saurian_Scaleshield.webp`,mana:4,attack:3,hp:6,rarity:`rare`,keywords:[`Warden`],lore:`Its scales have turned aside blades, bolts, and at least one siege engine.`},{id:142,name:`Saurian Skullmage`,image:`Saurian_Skullmage.webp`,mana:4,attack:4,hp:4,rarity:`rare`,keywords:[`Omen`],lore:`The skull staff is not a trophy — it is a library.`},{id:143,name:`Saurian Sungazer`,image:`Saurian_Sungazer.webp`,mana:3,attack:3,hp:3,rarity:`uncommon`,keywords:[],lore:`It faces the sun each morning — and whatever the sun shows it, it remembers.`},{id:144,name:`Shadowfox Ninetails`,image:`Shadowfox_Ninetails.webp`,mana:6,attack:5,hp:6,rarity:`legendary`,keywords:[`Ambush`,`Leech`],lore:`She moves through Ravendawn's shadows like she owns them — she does.`},{id:145,name:`Shark Goldfin`,image:`Shark_Goldfin.webp`,mana:4,attack:5,hp:3,rarity:`rare`,keywords:[`Ambush`],lore:`The golden fin is the last thing merchants see before the hull splits.`},{id:146,name:`Shark Harpooner`,image:`Shark_Harpooner.webp`,mana:3,attack:4,hp:3,rarity:`uncommon`,keywords:[],lore:`He hunts the sea's worst predators — professionally.`},{id:147,name:`Shark Hydromancer`,image:`Shark_Hydromancer.webp`,mana:5,attack:4,hp:5,rarity:`epic`,keywords:[],lore:`The ocean bends to her will — she bent to no one's.`},{id:148,name:`Sharpweed Trunk`,image:`Sharpweed_Trunk.webp`,mana:4,attack:4,hp:5,rarity:`rare`,keywords:[`Warden`],lore:`The weed grows back faster than it can be cut — eventually, it stopped being cut.`},{id:149,name:`Skeleton`,image:`Skeleton.webp`,mana:1,attack:1,hp:2,rarity:`uncommon`,keywords:[],lore:`Ravendawn's wars left many unburied — they found other purposes.`},{id:150,name:`Skeleton Archer`,image:`Skeleton_archer.webp`,mana:2,attack:3,hp:1,rarity:`uncommon`,keywords:[],lore:`Death improved his aim — he no longer flinches.`},{id:151,name:`Skeleton Haunt`,image:`Skeleton_Haunt.webp`,mana:2,attack:2,hp:2,rarity:`uncommon`,keywords:[`Hollow`],lore:`It haunts the battlefield long after the battle ends.`},{id:152,name:`Skeleton Pikeman`,image:`Skeleton_Pikeman.webp`,mana:2,attack:2,hp:3,rarity:`uncommon`,keywords:[],lore:`He held the line in life — he holds it still.`},{id:153,name:`Skeleton Raider`,image:`Skeleton_Raider.webp`,mana:3,attack:3,hp:2,rarity:`uncommon`,keywords:[],lore:`Death did not slow the raid — it just removed the need for supplies.`},{id:154,name:`Skeleton Rothclub`,image:`Skeleton_Rothclub.webp`,mana:3,attack:4,hp:2,rarity:`uncommon`,keywords:[],lore:`The club is older than Ravencrest — and still swinging.`},{id:155,name:`Skeleton Soldier`,image:`Skeleton_Soldier.webp`,mana:2,attack:2,hp:3,rarity:`uncommon`,keywords:[],lore:`Still in formation, still following orders no one remembers giving.`},{id:156,name:`Skorn Acolyte`,image:`Skorn_Acolyte.webp`,mana:2,attack:2,hp:3,rarity:`uncommon`,keywords:[],lore:`The Skorn cult takes anyone willing — the willing rarely last.`},{id:157,name:`Skorn Deathblade`,image:`Skorn_Deathblade.webp`,mana:5,attack:6,hp:4,rarity:`epic`,keywords:[`Ambush`,`Leech`],lore:`The blade was forged in Ravencrest's darkest ritual — it has not dulled since.`},{id:158,name:`Skorn Grandmaster`,image:`Skorn_Grandmaster.webp`,mana:7,attack:6,hp:7,rarity:`legendary`,keywords:[`Warden`,`Leech`],lore:`He has outlived every Skorn master before him — that is not a coincidence.`},{id:159,name:`Skorn Initiate`,image:`Skorn_Initiate.webp`,mana:2,attack:2,hp:3,rarity:`uncommon`,keywords:[],lore:`New to the order, eager to prove it.`},{id:160,name:`Skorn Warlock`,image:`Skorn_Warlock.webp`,mana:4,attack:4,hp:4,rarity:`rare`,keywords:[`Leech`],lore:`He draws power from suffering — Ravendawn gives him plenty to work with.`},{id:161,name:`Spearhog`,image:`Spearhog.webp`,mana:3,attack:4,hp:2,rarity:`uncommon`,keywords:[`Ambush`],lore:`The spear is fixed — so is its intention.`},{id:162,name:`Spellslayer Drake`,image:`Spellslayer_Drake.webp`,mana:6,attack:6,hp:5,rarity:`epic`,keywords:[`Apex`],lore:`It hunts mages specifically — the magic tastes better.`},{id:163,name:`Sunchaser Jackal`,image:`Sunchaser_Jackal.webp`,mana:3,attack:3,hp:3,rarity:`uncommon`,keywords:[],lore:`It runs toward the dawn — whatever is chasing it runs faster.`},{id:164,name:`Toad`,image:`Toad.webp`,mana:1,attack:1,hp:2,rarity:`uncommon`,keywords:[],lore:`Ugly, patient, and still here after everything else died.`},{id:165,name:`Toadstool Shaman`,image:`Toadstool_Shaman.webp`,mana:3,attack:2,hp:4,rarity:`rare`,keywords:[`Omen`],lore:`The mushrooms he consults are not entirely natural — neither is he anymore.`},{id:166,name:`Toadstool Warrior`,image:`Toadstool_Warrior.webp`,mana:3,attack:3,hp:4,rarity:`uncommon`,keywords:[],lore:`He fights with the stubbornness of something that grows back after being cut.`},{id:167,name:`Toad Ambusher`,image:`Toad_ambusher.webp`,mana:2,attack:3,hp:2,rarity:`uncommon`,keywords:[`Ambush`],lore:`It waits in the mud until the moment is perfect — the moment is always perfect.`},{id:168,name:`Toad Enforcer`,image:`Toad_Enforcer.webp`,mana:3,attack:3,hp:3,rarity:`uncommon`,keywords:[],lore:`He collects debts in the Ravencrest swamp district — the interest is steep.`},{id:169,name:`Toad Executioner`,image:`Toad_Executioner.webp`,mana:4,attack:5,hp:3,rarity:`rare`,keywords:[`Ambush`],lore:`The sentence was already decided — he just delivers it.`},{id:170,name:`Toad Farseer`,image:`Toad_Farseer.webp`,mana:3,attack:2,hp:4,rarity:`uncommon`,keywords:[`Omen`],lore:`From the highest bog tower in Ravendawn, she sees what others cannot imagine.`},{id:171,name:`Toad Sentinel`,image:`Toad_Sentinel.webp`,mana:2,attack:1,hp:4,rarity:`uncommon`,keywords:[`Warden`],lore:`Slow to move, impossible to move past.`},{id:172,name:`Troll`,image:`Troll.webp`,mana:4,attack:4,hp:5,rarity:`uncommon`,keywords:[],lore:`It was here before Ravendawn — it will be here after.`},{id:173,name:`Troll Brawler`,image:`Troll_Brawler.webp`,mana:3,attack:4,hp:3,rarity:`uncommon`,keywords:[],lore:`He fights for money, food, or fun — usually all three at once.`},{id:174,name:`Troll Champion`,image:`Troll_champion.webp`,mana:5,attack:5,hp:6,rarity:`epic`,keywords:[`Warden`],lore:`The Troll Champion has never lost a fight — trolls don't count draws.`},{id:175,name:`Troll Knight`,image:`Troll_Knight.webp`,mana:5,attack:4,hp:6,rarity:`rare`,keywords:[`Warden`],lore:`He was knighted in Ravencrest under different circumstances — the honor stuck.`},{id:176,name:`Troll Titan`,image:`Troll_Titan.webp`,mana:8,attack:8,hp:8,rarity:`legendary`,keywords:[`Warden`,`Apex`],lore:`When the Troll Titan moves, Ravendawn moves with it.`},{id:177,name:`Troll Warlock`,image:`Troll_Warlock.webp`,mana:4,attack:4,hp:5,rarity:`rare`,keywords:[`Leech`],lore:`He learned dark magic to survive the wilderness — the wilderness regrets teaching him.`},{id:178,name:`Twinhead Yeti`,image:`Twinhead_Yeti.webp`,mana:6,attack:6,hp:6,rarity:`epic`,keywords:[`Warden`],lore:`Two heads, one purpose — neither of them is retreat.`},{id:179,name:`Vampire Necromancer`,image:`Vampire_Necromancer.webp`,mana:5,attack:4,hp:5,rarity:`epic`,keywords:[`Leech`,`Hollow`],lore:`She raises the dead not out of grief — out of inventory management.`},{id:180,name:`Vampire Reaver`,image:`Vampire_Reaver.webp`,mana:4,attack:5,hp:3,rarity:`rare`,keywords:[`Leech`,`Ambush`],lore:`He strikes before the blood cools — it tastes better warm.`},{id:181,name:`Vampire Vixen`,image:`Vampire_Vixen.webp`,mana:3,attack:4,hp:3,rarity:`rare`,keywords:[`Leech`],lore:`Ravencrest's nobility invited her to the gala — half of them didn't leave.`},{id:182,name:`Venomous Contraption`,image:`Venomous_contraption.webp`,mana:3,attack:3,hp:4,rarity:`rare`,keywords:[`Hollow`],lore:`Built to deliver poison, it leaks it whether you want it to or not.`},{id:183,name:`Vermurat`,image:`Vermurat.webp`,mana:6,attack:6,hp:6,rarity:`legendary`,keywords:[`Apex`,`Leech`],lore:`The oldest rat lord in Ravendawn, Vermurat has outlived every exterminator sent after him.`},{id:184,name:`Vile Wurm`,image:`Vile_wurm.webp`,mana:5,attack:5,hp:5,rarity:`epic`,keywords:[`Leech`],lore:`It burrows beneath Ravendawn's roads and waits — the roads have gotten shorter.`},{id:185,name:`Warlock Ezanor`,image:`Warlock_Ezanor.webp`,mana:7,attack:6,hp:7,rarity:`legendary`,keywords:[`Apex`,`Omen`],lore:`Ezanor was banished from Ravencrest three times — each time, the city was worse off for it.`},{id:186,name:`Wildfire Jackal`,image:`Wildfire_Jackal.webp`,mana:4,attack:5,hp:3,rarity:`rare`,keywords:[`Ambush`,`Apex`],lore:`Where it runs, fire follows — Ravendawn's rangers shoot on sight.`},{id:187,name:`Winterborn Guardian`,image:`Winterborn_Guardian.webp`,mana:4,attack:3,hp:6,rarity:`rare`,keywords:[`Warden`],lore:`Born in the coldest winter Ravendawn ever suffered, it has never warmed up.`},{id:188,name:`Winterborn Hunter`,image:`Winterborn_Hunter.webp`,mana:3,attack:4,hp:3,rarity:`uncommon`,keywords:[`Ambush`],lore:`He tracks prey through blizzards — the cold keeps the trail fresh.`},{id:189,name:`Winterborn Shaman`,image:`Winterborn_Shaman.webp`,mana:4,attack:3,hp:5,rarity:`epic`,keywords:[`Omen`],lore:`The spirits of Ravendawn's frozen dead speak through her — they are not at peace.`},{id:190,name:`Yornish Druid`,image:`Yornish_Druid.webp`,mana:3,attack:2,hp:5,rarity:`rare`,keywords:[`Omen`],lore:`The Yorn forests predate Ravendawn — he intends for them to outlast it too.`},{id:191,name:`Yornish Frostbearer`,image:`Yornish_Frostbearer.webp`,mana:5,attack:4,hp:6,rarity:`epic`,keywords:[`Warden`],lore:`She carries winter with her wherever she walks — Ravendawn's south has never fully thawed.`},{id:192,name:`Yornish Hunter`,image:`Yornish_Hunter.webp`,mana:3,attack:4,hp:3,rarity:`uncommon`,keywords:[`Ambush`],lore:`The Yorn hunt in silence — you hear them only when they want you to.`},{id:193,name:`Zorian Hailbringer`,image:`Zorian_Hailbringer.webp`,mana:5,attack:5,hp:5,rarity:`epic`,keywords:[`Apex`],lore:`The Zorian storm front arrives before the army — by design.`},{id:194,name:`Zorian Shoreguard`,image:`Zorian_Shoreguard.webp`,mana:4,attack:3,hp:6,rarity:`rare`,keywords:[`Warden`],lore:`Ravendawn's coastline has one guardian — it has never needed a second.`},{id:195,name:`Zorian Stormcaller`,image:`Zorian_Stormcaller.webp`,mana:5,attack:5,hp:4,rarity:`epic`,keywords:[`Apex`],lore:`She doesn't call storms — she reminds them where to go.`}],i=`/mi-tcg/`,a=2,o=20,s=5;function c(e){return`ravenclash_deck_${e}`}function l(e=1){try{let t=localStorage.getItem(c(e));return t?JSON.parse(t):null}catch{return null}}function ee(){return Array.from({length:s},(e,t)=>{let n=t+1;return{slot:n,...l(n)||{cards:[],name:`Deck ${n}`,coverId:null}}})}function u(e,t,n,r){localStorage.setItem(c(e),JSON.stringify({cards:t,name:n,coverId:r}))}var d={uncommon:`RavenCard_Green_Frame.png`,rare:`RavenCard_Blue_Frame.png`,epic:`RavenCard_Purple_Frame.png`,legendary:`RavenCard_Frame.png`},te={uncommon:1,rare:2,epic:3,legendary:4},f=1,p={search:``,rarity:`all`,mana:`all`},m=[],h=`My Deck`,g=null,_=!1;function ne(e){f=e;let t=l(e);t?Array.isArray(t)?(m=[...t],h=`Deck ${e}`,g=null):(m=t.cards?[...t.cards]:[],h=t.name||`Deck ${e}`,g=t.coverId||null):(m=[],h=`Deck ${e}`,g=null),_=!1}function re(){return r.filter(e=>{let t=e.name.toLowerCase().includes(p.search.toLowerCase()),n=p.rarity===`all`||e.rarity===p.rarity,r=p.mana===`all`||e.mana===parseInt(p.mana);return t&&n&&r}).sort((e,t)=>e.mana-t.mana||te[e.rarity]-te[t.rarity])}function ie(e){return m.filter(t=>t.id===e).length}function ae(e){let t=ie(e.id),n=t>=a,r=g===e.id;return`
    <div class="thumb-card ${n&&!_?`maxed`:``} ${r?`is-cover`:``} rarity-${e.rarity}" data-id="${e.id}">
      <div class="thumb-image">
        <img src="${i}cards/${e.image}" alt="${e.name}" />
        <div class="thumb-frame">
          <img src="${i}${d[e.rarity]}" alt="" />
        </div>
        <div class="thumb-mana">
          <img class="mana-icon-img" src="${i}pngicons/mana.png" />
          <span class="mana-number">${e.mana}</span>
        </div>
        ${r?`<div class="cover-badge">✦</div>`:``}
        ${t>0&&!_?`<div class="thumb-count">×${t}</div>`:``}
      </div>
      <div class="thumb-name">${e.name}</div>
      <div class="thumb-stats">
        <img class="badge-icon-img" src="${i}pngicons/crossed_swords.png" />${e.attack}
        <img class="badge-icon-img" src="${i}pngicons/heart.png" />${e.hp}
      </div>
    </div>
  `}function oe(){let e={};return m.forEach(t=>{e[t.id]||(e[t.id]={card:t,count:0}),e[t.id].count++}),Object.values(e).sort((e,t)=>e.card.mana-t.card.mana).map(({card:e,count:t})=>`
    <div class="deck-entry rarity-${e.rarity}" data-id="${e.id}">
      <div class="deck-entry-mana">${e.mana}</div>
      <div class="deck-entry-name">${e.name}</div>
      <div class="deck-entry-count">×${t}</div>
      <button class="deck-entry-remove" data-id="${e.id}">✕</button>
    </div>
  `).join(``)}function v(e=f){e!==f&&ne(e);let t=re(),n=m.length,a=n===o,c=g?r.find(e=>e.id===g):null;document.querySelector(`#app`).innerHTML=`
    <div class="deckbuilder-screen">

      <!-- LEFT: Card Collection -->
      <div class="collection-panel">
        <div class="collection-header">

          <!-- Deck slot selector -->
          <div class="deck-slots">
            ${Array.from({length:s},(e,t)=>{let n=t+1,a=l(n),s=a&&a.cards&&a.cards.length===o;return`<button class="deck-slot-btn ${n===f?`active`:``} ${s?`ready`:``}" data-slot="${n}">
                ${a&&a.coverId?`<img src="${i}cards/${r.find(e=>e.id===a.coverId)?.image}" class="slot-cover" />`:``}
                <span class="slot-label">${a&&a.name?a.name:`Deck ${n}`}</span>
                ${s?`<span class="slot-ready">✓</span>`:``}
              </button>`}).join(``)}
          </div>

          <div class="deck-name-row">
            <h2 class="panel-title">📖 Collection</h2>
            <input class="deck-name-input" id="deck-name-input" value="${h}" placeholder="Deck name..." maxlength="20" />
          </div>

          <div class="filters">
            <input class="filter-search" id="filter-search" placeholder="Search cards..." value="${p.search}" />
            <select class="filter-select" id="filter-rarity">
              <option value="all" ${p.rarity===`all`?`selected`:``}>All Rarities</option>
              <option value="uncommon" ${p.rarity===`uncommon`?`selected`:``}>Uncommon</option>
              <option value="rare" ${p.rarity===`rare`?`selected`:``}>Rare</option>
              <option value="epic" ${p.rarity===`epic`?`selected`:``}>Epic</option>
              <option value="legendary" ${p.rarity===`legendary`?`selected`:``}>Legendary</option>
            </select>
            <select class="filter-select" id="filter-mana">
              <option value="all" ${p.mana===`all`?`selected`:``}>All Mana</option>
              ${[1,2,3,4,5,6,7,8].map(e=>`
                <option value="${e}" ${p.mana==e?`selected`:``}>${e} Mana</option>
              `).join(``)}
            </select>
          </div>

          ${_?`<div class="cover-hint">✦ Click any card to set it as your deck cover</div>`:``}
          <div class="collection-count">${t.length} cards</div>
        </div>

        <div class="card-grid" id="card-grid">
          ${t.map(ae).join(``)}
        </div>
      </div>

      <!-- RIGHT: Deck -->
      <div class="deck-panel">
        <div class="deck-header">
          <h2 class="panel-title">🗡️ Your Deck</h2>
          <div class="deck-count ${a?`complete`:``}">${n} / ${o}</div>
        </div>

        <!-- Cover card preview -->
        <div class="deck-cover-section">
          ${c?`
            <div class="deck-cover-preview">
              <div class="thumb-image" style="width:70px;height:95px;position:relative;border-radius:6px;overflow:hidden;">
                <img src="${i}cards/${c.image}" style="width:100%;height:100%;object-fit:cover;" />
                <div class="thumb-frame" style="position:absolute;inset:0;">
                  <img src="${i}${d[c.rarity]}" style="width:100%;height:100%;object-fit:fill;" />
                </div>
              </div>
              <span class="cover-card-name">${c.name}</span>
            </div>
          `:`<div class="no-cover">No cover selected</div>`}
          <button class="btn-pick-cover ${_?`active`:``}" id="btn-pick-cover">
            ${_?`✕ Cancel`:`🖼 Set Cover`}
          </button>
        </div>

        <div class="deck-list" id="deck-list">
          ${m.length===0?`<div class="deck-empty">Click cards to add them</div>`:oe()}
        </div>

        <div class="deck-actions">
          ${a?`<button class="btn-save-deck" id="btn-save">✅ Deck Ready!</button>`:`<button class="btn-save-deck inactive" id="btn-save">Need ${o-n} more cards</button>`}
          <button class="btn-clear-deck" id="btn-clear">🗑 Clear</button>
          <button class="btn-back" id="btn-back">← Back to Menu</button>
        </div>
      </div>

    </div>
  `,se()}function se(){document.querySelectorAll(`.deck-slot-btn`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.dataset.slot);p={search:``,rarity:`all`,mana:`all`},v(t)})}),document.getElementById(`deck-name-input`)?.addEventListener(`input`,e=>{h=e.target.value,u(f,m,h,g)}),document.getElementById(`filter-search`)?.addEventListener(`input`,e=>{p.search=e.target.value,v(f)}),document.getElementById(`filter-rarity`)?.addEventListener(`change`,e=>{p.rarity=e.target.value,v(f)}),document.getElementById(`filter-mana`)?.addEventListener(`change`,e=>{p.mana=e.target.value,v(f)}),document.getElementById(`btn-pick-cover`)?.addEventListener(`click`,()=>{_=!_,v(f)}),document.querySelectorAll(`.thumb-card`).forEach(e=>{e.addEventListener(`click`,()=>{let t=parseInt(e.dataset.id),n=r.find(e=>e.id===t);if(!n)return;if(_){g=t,_=!1,u(f,m,h,g),v(f);return}if(m.length>=o||ie(t)>=a)return;let i=document.getElementById(`card-grid`)?.scrollTop||0;m.push(n),u(f,m,h,g),v(f),requestAnimationFrame(()=>{let e=document.getElementById(`card-grid`);e&&(e.scrollTop=i)})})}),document.querySelectorAll(`.deck-entry-remove`).forEach(e=>{e.addEventListener(`click`,t=>{t.stopPropagation();let n=parseInt(e.dataset.id),r=m.findIndex(e=>e.id===n);r!==-1&&m.splice(r,1),u(f,m,h,g),v(f)})}),document.getElementById(`btn-clear`)?.addEventListener(`click`,()=>{m=[],u(f,m,h,g),v(f)}),document.getElementById(`btn-back`)?.addEventListener(`click`,()=>{n.go(`menu`)})}var ce={uncommon:`RavenCard_Green_Frame.png`,rare:`RavenCard_Blue_Frame.png`,epic:`RavenCard_Purple_Frame.png`,legendary:`RavenCard_Frame.png`},le=[{id:`vs-ai`,label:`vs AI`,desc:`Battle the computer`,available:!0},{id:`vs-player`,label:`vs Player`,desc:`Challenge a friend`,available:!1}],y=`vs-ai`,b=null;function ue(){return localStorage.getItem(`ravenclash_player_name`)||`Traveler`}function de(e){localStorage.setItem(`ravenclash_player_name`,e)}function fe(e){return e.filter(e=>e.cards&&e.cards.length===20)}function x(){let e=ee(),t=fe(e),n=ue();b===null&&t.length>0&&(b=t[0].slot);let a=e.find(e=>e.slot===b),o=y===`vs-ai`&&a&&a.cards&&a.cards.length===20;document.querySelector(`#app`).innerHTML=`
    <div class="newmenu-screen">

      <!-- TOP BAR -->
      <div class="newmenu-topbar">
        <div class="topbar-logo">RavenClash</div>
        <div class="topbar-profile">
          <div class="topbar-avatar">⚔️</div>
          <div class="topbar-info">
            <div class="topbar-name-wrapper">
              <input class="topbar-name-input" id="topbar-name" value="${n}" maxlength="20" />
              <span class="topbar-name-pencil">✏️</span>
            </div>
            <div class="topbar-stats">${t.length} deck${t.length===1?``:`s`} ready</div>
          </div>
        </div>
        <div class="topbar-actions">
          <button class="topbar-btn" id="btn-collection">📖 Collection</button>
        </div>
      </div>

      <div class="newmenu-body">

        <!-- LEFT SIDEBAR: Game Modes -->
        <div class="newmenu-sidebar">
          <div class="sidebar-title">Game Modes</div>
          ${le.map(e=>`
            <div class="sidebar-mode ${e.id===y?`active`:``} ${e.available?``:`coming-soon`}" data-mode="${e.id}">
              <div class="mode-art">
                ${t.length>0&&e.available?`
                  <img src="${i}cards/${r[Math.floor(Math.random()*10)].image}" style="width:100%;height:100%;object-fit:cover;opacity:0.4;" />
                `:``}
              </div>
              <div class="mode-info">
                <div class="mode-label">${e.label}</div>
                <div class="mode-desc">${e.available?e.desc:`Coming Soon`}</div>
              </div>
              ${e.id===y?`<div class="mode-active-bar"></div>`:``}
            </div>
          `).join(``)}
        </div>

        <!-- CENTER: Deck Selection + Play -->
        <div class="newmenu-center">
          <div class="center-title">
            ${y===`vs-ai`?`🤖 vs AI — Select Your Deck`:`👥 vs Player — Coming Soon`}
          </div>

          ${y===`vs-ai`?`
            <div class="center-decks">
              ${e.map(e=>{let t=e.cards&&e.cards.length===20,n=e.slot===b,a=e.coverId?r.find(t=>t.id===e.coverId):null,o=a?ce[a.rarity]:null;return`
                  <div class="center-deck ${t?`ready`:`empty`} ${n?`selected`:``}" data-slot="${e.slot}">
                    <div class="center-deck-art">
                      ${a?`
                        <img src="${i}cards/${a.image}" style="width:100%;height:100%;object-fit:cover;" />
                        <div style="position:absolute;inset:0;">
                          <img src="${i}${o}" style="width:100%;height:100%;object-fit:fill;" />
                        </div>
                      `:`<div class="center-deck-empty-art">?</div>`}
                      ${n?`<div class="deck-selected-overlay">✓</div>`:``}
                    </div>
                    <div class="center-deck-info">
                      <div class="center-deck-name">${e.name||`Deck ${e.slot}`}</div>
                      <div class="center-deck-status ${t?`status-ready`:`status-empty`}">
                        ${t?`${e.cards.length} cards`:`Empty`}
                      </div>
                    </div>
                  </div>
                `}).join(``)}
            </div>

            <div class="center-play-area">
              <button class="btn-play ${o?``:`disabled`}" id="btn-play">
                ${o?`⚔️ PLAY`:t.length===0?`Build a deck first`:`Select a deck`}
              </button>
              <button class="btn-go-builder" id="btn-go-builder">+ Build / Edit Decks</button>
            </div>
          `:`
            <div class="coming-soon-center">
              <div class="coming-soon-icon">🛡️</div>
              <div class="coming-soon-text">Multiplayer coming soon</div>
            </div>
          `}
        </div>

      </div>
    </div>
  `,pe(e,o)}function pe(e,t){document.getElementById(`topbar-name`)?.addEventListener(`change`,e=>{de(e.target.value)}),document.querySelectorAll(`.sidebar-mode`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.mode;le.find(e=>e.id===t)?.available&&(y=t,x())})}),document.querySelectorAll(`.center-deck.ready`).forEach(e=>{e.addEventListener(`click`,()=>{b=parseInt(e.dataset.slot),x()})}),document.getElementById(`btn-play`)?.addEventListener(`click`,()=>{t&&n.go(`prematch`,{slot:b})}),document.getElementById(`btn-collection`)?.addEventListener(`click`,()=>{n.go(`deckbuilder`)}),document.getElementById(`btn-go-builder`)?.addEventListener(`click`,()=>{n.go(`deckbuilder`)})}var S=[{id:`skorn`,name:`Lord Skorn the Wicked`,color:`#1a1a1a`,borderColor:`#aaaaaa`,glowColor:`rgba(80,80,80,0.6)`,image:`lordofskorn.webp`,passive:`Warden creatures gain +1 HP when played.`,abilityName:`Fortify`,abilityCost:2,abilityDesc:`Give a friendly creature +2 HP.`,abilityEffect:`fortify`},{id:`serafine`,name:`Serafine the Blood Mistress`,color:`#8e44ad`,borderColor:`#c39bd3`,glowColor:`rgba(142,68,173,0.6)`,image:`serafine.webp`,passive:`Draw 1 extra card on your first turn.`,abilityName:`Foresight`,abilityCost:1,abilityDesc:`Look at the top 3 cards of your deck, keep 1 on top.`,abilityEffect:`foresight`},{id:`blake`,name:`Blake, Lord of Blood`,color:`#c0392b`,borderColor:`#e74c3c`,glowColor:`rgba(192,57,43,0.6)`,image:`blake.webp`,passive:`Leech creatures heal +1 extra per attack.`,abilityName:`Blood Price`,abilityCost:2,abilityDesc:`Deal 3 damage to any creature. You lose 1 HP.`,abilityEffect:`bloodprice`},{id:`djinn`,name:`Djinn`,color:`#d4a017`,borderColor:`#f1c40f`,glowColor:`rgba(212,160,23,0.6)`,image:`djinn.webp`,passive:`Ambush creatures gain +1 attack when played.`,abilityName:`Unleash`,abilityCost:2,abilityDesc:`Give a friendly creature Ambush until end of turn.`,abilityEffect:`unleash`},{id:`igneas`,name:`Igneas`,color:`#2980b9`,borderColor:`#5dade2`,glowColor:`rgba(41,128,185,0.6)`,image:`igneas.webp`,passive:`Opponent's first turn max mana is reduced by 1.`,abilityName:`Glacial Grasp`,abilityCost:3,abilityDesc:`Exhaust an enemy creature — it skips its next attack.`,abilityEffect:`glacialgrasp`}],C=null,me=1;function he(e){C=null,me=e?.slot||1,ge()}function ge(){document.querySelector(`#app`).innerHTML=`
    <div class="prematch-screen">
      <div class="prematch-content">
        <h1 class="prematch-title">Choose Your Hero</h1>
        <p class="prematch-sub">Your hero's power will shape the battle</p>

        <div class="hero-select-grid">
          ${S.map(e=>`
            <div class="hero-card ${C===e.id?`selected`:``}"
              data-hero="${e.id}"
              style="--hero-color: ${e.color}; --hero-border: ${e.borderColor}; --hero-glow: ${e.glowColor};">
              <div class="hero-portrait-art">
                ${e.image?`<img src="${i}heroes/${e.image}" style="width:100%;height:100%;object-fit:cover;" />`:`<div class="hero-placeholder" style="background: linear-gradient(135deg, ${e.color}, #0d0d1a);">
                      <span style="font-size:48px;">⚔️</span>
                    </div>`}
              </div>
              <div class="hero-card-info">
                <div class="hero-card-name" style="color:${e.borderColor}">${e.name}</div>
                <div class="hero-card-passive">✦ ${e.passive}</div>
                <div class="hero-card-ability">
                  <span class="hero-ability-name">${e.abilityName}</span>
                  <span class="hero-ability-cost">${e.abilityCost} mana</span>
                </div>
                <div class="hero-card-ability-desc">${e.abilityDesc}</div>
              </div>
            </div>
          `).join(``)}
        </div>

        <button class="btn-confirm-hero" id="btn-confirm-hero" style="display:none;"><img src="/mi-tcg/pngicons/crossed_swords.png" style="width:32px;height:32px;vertical-align:middle;margin-right:10px;" />Confirm Hero</button>
        <button class="btn-back prematch-back" id="btn-back">← Back</button>
      </div>
    </div>
  `,document.querySelectorAll(`.hero-card`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.hero-card`).forEach(e=>e.classList.remove(`selected`)),e.classList.add(`selected`),C=e.dataset.hero;let t=document.getElementById(`btn-confirm-hero`);t&&(t.style.display=`block`)})}),document.getElementById(`btn-confirm-hero`)?.addEventListener(`click`,()=>{C&&n.go(`game`,{slot:me,heroId:C})}),document.getElementById(`btn-back`)?.addEventListener(`click`,()=>{n.go(`menu`)})}var w=`/mi-tcg/`,T={card_play:new Audio(`${w}sounds/card_play.wav`),attack:new Audio(`${w}sounds/attack.wav`),death:new Audio(`${w}sounds/death.wav`),victory:new Audio(`${w}sounds/victory.wav`),defeat:new Audio(`${w}sounds/defeat.mp3`),card_draw:new Audio(`${w}sounds/card_draw.mp3`),turn:new Audio(`${w}sounds/turn.wav`)};Object.values(T).forEach(e=>{e.preload=`auto`,e.volume=.5}),T.victory.volume=.7,T.defeat.volume=.7,T.turn.volume=.3,T.card_draw.volume=.4;var E=!1;function D(e){if(E)return;let t=T[e];t&&(t.currentTime=0,t.play().catch(()=>{}))}function _e(){return E=!E,E}function ve(){return E}var ye=`modulepreload`,be=function(e){return`/mi-tcg/`+e},O={},k=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=be(t,n),t in O)return;O[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:ye,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},A=t({attackHero:()=>Te,attackWithCard:()=>we,checkWin:()=>R,endTurn:()=>De,freshGame:()=>Me,gameState:()=>F,playCard:()=>Ce,resolveAbilityTarget:()=>Pe,resolveOmen:()=>Fe,triggerOmen:()=>z,triggerOpponentFirst:()=>Ie,useHeroAbility:()=>Ne}),xe=1;function j(){return xe++}function M(e){let t=[...e];for(let e=t.length-1;e>0;e--){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function N(e=1){let t=localStorage.getItem(`ravenclash_deck_${e}`),n=t?JSON.parse(t):null,i=n?.cards||(Array.isArray(n)?n:null);return M([...i&&i.length>0?i:[...r,...r].slice(0,20)]).map(e=>({...e,uid:j(),currentHp:e.hp,canAttack:!1,exhausted:!1,isOpponent:!1}))}function P(){return M([...r,...r,...r,...r]).slice(0,20).map(e=>({...e,uid:j(),currentHp:e.hp,canAttack:!1,exhausted:!1,isOpponent:!0}))}var F={turn:`player`,phase:`play`,turnNumber:1,selectedCard:null,gameOver:!1,winner:null,log:[`🎮 Game started! Your turn.`],_opponentGoesFirst:!1,_skipOpponentManaIncrement:!1,_omenPending:null,_abilityTargeting:!1,hero:null,heroAbilityUsed:!1,player:{hp:20,mana:0,maxMana:0,hand:[],board:[],deck:[],graveyard:[],fatigueDamage:0},opponent:{hp:20,mana:0,maxMana:0,hand:[],board:[],deck:[],graveyard:[],fatigueDamage:0}},I=N(),Se=P();F.player.deck=I.slice(5),F.player.hand=I.slice(0,5),F.opponent.deck=Se.slice(5),F.opponent.hand=Se.slice(0,5),Math.random()<.5?(F.turn=`opponent`,F.log=[`🎲 Opponent goes first!`],F._opponentGoesFirst=!0,F._skipOpponentManaIncrement=!0,F.opponent.mana=1,F.opponent.maxMana=1):(F.log=[`🎲 You go first!`],F.player.mana=1,F.player.maxMana=1);function Ce(e){if(F.turn!==`player`||F.phase!==`play`)return;let t=F.player.hand.findIndex(t=>t.uid===e);if(t===-1)return;let n=F.player.hand[t];if(n.mana>F.player.mana){F.log.push(`<span class="log-damage">❌ Not enough mana to play ${n.name}.</span>`);return}F.player.mana-=n.mana,F.player.hand.splice(t,1);let r=n.keywords?.includes(`Ambush`),i=F.hero;i&&(i.id===`skorn`&&n.keywords?.includes(`Warden`)&&(n.hp+=1,n.currentHp+=1,F.log.push(`<span class="log-special">🖤 Lord Skorn's passive: ${n.name} gains +1 HP!</span>`)),i.id===`djinn`&&n.keywords?.includes(`Ambush`)&&(n.attack+=1,F.log.push(`<span class="log-special">✨ Djinn passive: ${n.name} gains +1 Attack!</span>`)),i.id),n.canAttack=!!r,n.exhausted=!1,F.player.board.push(n),F.log.push(`<span class="log-special">▶️ You played ${n.name}.</span>`),D(`card_play`),setTimeout(()=>Re(n.uid),50),n.keywords?.includes(`Omen`)&&z(F.player)}async function we(e){if(F.turn!==`player`||F.phase!==`attack`)return;let t=F.player.board.find(t=>t.uid===e);if(t&&!t.isOpponent){if(!t.canAttack){F.log.push(`<span class="log-damage">😴 ${t.name} has summoning sickness — wait a turn.</span>`),F.selectedCard=null;return}if(t.exhausted){F.log.push(`<span class="log-damage">😓 ${t.name} already attacked this turn.</span>`),F.selectedCard=null;return}F.selectedCard=t,F.log.push(`<span class="log-special">🎯 ${t.name} ready — click an enemy creature or the opponent's hero.</span>`);return}if(F.selectedCard){let t=F.selectedCard,n=F.opponent.board.find(t=>t.uid===e);if(n){if(F.opponent.board.filter(e=>e.keywords?.includes(`Warden`)).length>0&&!n.keywords?.includes(`Warden`)){F.log.push(`<span class="log-special">🛡️ You must attack a Warden creature first!</span>`),F.selectedCard=null;return}await Ee(t,n),F.selectedCard=null}}}function Te(e){if(F.turn!==`player`||F.phase!==`attack`)return;let t=F.player.board.find(t=>t.uid===e);if(!t||!t.canAttack||t.exhausted)return;if(F.opponent.board.filter(e=>e.keywords?.includes(`Warden`)).length>0){F.log.push(`<span class="log-special">🛡️ Can't attack the hero — a Warden is protecting them!</span>`),F.selectedCard=null;return}let n=t.keywords?.includes(`Apex`)?t.attack*2:t.attack;F.opponent.hp-=n,t.exhausted=!0,F.selectedCard=null,Y(`opponent`),D(`attack`),F.log.push(`<span class="log-damage">⚔️ ${t.name} attacked the enemy hero for ${n}!${t.keywords?.includes(`Apex`)?` (Apex - double damage!)`:``}</span>`),t.keywords?.includes(`Leech`)&&(F.player.hp=Math.min(30,F.player.hp+n),F.log.push(`<span class="log-heal">🩸 ${t.name} leeched ${n} HP back to you!</span>`)),R(),k(()=>Promise.resolve().then(()=>B).then(e=>e.renderBoard()),void 0)}async function Ee(e,t){let n=!e.isOpponent;await ze(e.uid,n?`up`:`down`),D(`attack`),q(t.uid),q(e.uid);let r=document.querySelector(`[data-uid="${t.uid}"]`),i=document.querySelector(`[data-uid="${e.uid}"]`);if(r&&K(e.attack,r),i&&K(t.attack,i),e.currentHp-=t.attack,t.currentHp-=e.attack,e.exhausted=!0,F.log.push(`<span class="log-damage">⚔️ ${e.name} (${e.attack} atk) vs ${t.name} (${t.attack} atk)</span>`),e.keywords?.includes(`Leech`)){let t=e.isOpponent?F.opponent:F.player;t.hp=Math.min(30,t.hp+e.attack),F.log.push(`<span class="log-heal">🩸 ${e.name} leeched ${e.attack} HP!</span>`)}let a=[];e.currentHp<=0&&(a.push(e.uid),F.log.push(`<span class="log-death">💀 ${e.name} died.</span>`)),t.currentHp<=0&&(a.push(t.uid),F.log.push(`<span class="log-death">💀 ${t.name} died.</span>`)),a.length>0&&(D(`death`),await Promise.all(a.map(e=>J(e))));let o=[...F.player.board.filter(e=>e.currentHp<=0),...F.opponent.board.filter(e=>e.currentHp<=0)];for(let e of o)if(e.keywords?.includes(`Hollow`)){let t=e.isOpponent?F.opponent:F.player;if(t.board.length<7){let n={uid:j(),id:0,name:`${e.name} Echo`,image:e.image,mana:1,attack:1,hp:1,currentHp:1,rarity:e.rarity,keywords:[],lore:``,canAttack:!1,exhausted:!1,isOpponent:e.isOpponent};t.board.push(n),F.log.push(`<span class="log-special">👻 ${e.name}'s Hollow summoned a 1/1 Echo token!</span>`)}}F.player.board.forEach(e=>{e.currentHp<=0&&F.player.graveyard.push({...e})}),F.opponent.board.forEach(e=>{e.currentHp<=0&&F.opponent.graveyard.push({...e})}),F.player.board=F.player.board.filter(e=>e.currentHp>0),F.opponent.board=F.opponent.board.filter(e=>e.currentHp>0)}function De(){F.player.board.forEach(e=>{e._unleashTemp&&=(e.keywords=e.keywords.filter(e=>e!==`Ambush`),!1)}),F.phase=`play`,F.selectedCard=null,F._abilityTargeting=null,F.turn=`opponent`,F.log.push(`<span class="log-turn">⏭️ You ended your turn.</span>`),setTimeout(()=>{je()},800)}function L(e){return e.attack+e.currentHp}function Oe(e,t){let n=t.filter(t=>e.attack>=t.currentHp&&t.attack<e.currentHp);if(n.length>0)return n.reduce((e,t)=>L(t)>L(e)?t:e);let r=t.filter(t=>e.attack>=t.currentHp&&L(t)>=L(e));return r.length>0?r.reduce((e,t)=>L(t)>L(e)?t:e):t.reduce((e,t)=>L(t)>L(e)?t:e)}function ke(e){return e.reduce((e,t)=>e+t.attack,0)>=F.player.hp}function Ae(e,t){let n=[...e].sort((e,t)=>L(t)-L(e)),r=[],i=t;for(let e of n)e.mana<=i&&(r.push(e),i-=e.mana);return r}async function je(){let e=F.opponent;F._skipOpponentManaIncrement?F._skipOpponentManaIncrement=!1:(e.maxMana=Math.min(10,e.maxMana+1),e.mana=e.maxMana),e.board.forEach(e=>{e.canAttack=!0,e.exhausted=!1}),F.oppHeroAbilityUsed=!1;let t=e.board.map(e=>e.uid),n=Ae(e.hand,e.mana);for(let t of n){let n=e.hand.findIndex(e=>e.uid===t.uid);n!==-1&&(t.mana>e.mana||(e.hand.splice(n,1),e.mana-=t.mana,t.canAttack=!!t.keywords?.includes(`Ambush`),t.exhausted=!1,F.log.push(`<span class="log-special">🤖 Opponent played ${t.name}.</span>`),D(`card_play`),await $(t,!0),e.board.push(t),k(()=>Promise.resolve().then(()=>B).then(e=>e.renderBoard()),void 0),await new Promise(e=>setTimeout(e,300))))}let r=F.oppHero;if(r&&!F.oppHeroAbilityUsed&&e.mana>=r.abilityCost&&Math.random()<.65){e.mana-=r.abilityCost,F.oppHeroAbilityUsed=!0;let t=r.abilityEffect;if(t===`fortify`&&e.board.length>0){let t=e.board.reduce((e,t)=>t.currentHp>e.currentHp?t:e);t.hp+=2,t.currentHp+=2,F.log.push(`<span class="log-special">🤖 ${r.name} uses Fortify on ${t.name}! (+2 HP)</span>`)}else if(t===`foresight`){let t=e.deck;if(t.length>0){let e=t.splice(0,Math.min(3,t.length)),n=e.reduce((e,t)=>t.mana>e.mana?t:e),i=e.filter(e=>e.uid!==n.uid);t.unshift(n),t.push(...i),F.log.push(`<span class="log-special">🤖 ${r.name} uses Foresight!</span>`)}}else if(t===`bloodprice`&&F.player.board.length>0){let t=F.player.board.reduce((e,t)=>t.currentHp<e.currentHp?t:e);t.currentHp-=3,--e.hp,F.log.push(`<span class="log-special">🤖 ${r.name} uses Blood Price on ${t.name} for 3 damage!</span>`),F.player.board.forEach(e=>{e.currentHp<=0&&F.player.graveyard.push({...e})}),F.player.board=F.player.board.filter(e=>e.currentHp>0),R()}else if(t===`unleash`&&e.board.length>0){let t=e.board.find(e=>!e.canAttack&&!e.exhausted)||e.board[0];t.keywords||=[],t.keywords.push(`Ambush`),t.canAttack=!0,t._unleashTemp=!0,F.log.push(`<span class="log-special">🤖 ${r.name} uses Unleash on ${t.name}!</span>`)}else if(t===`glacialgrasp`&&F.player.board.length>0){let e=F.player.board.reduce((e,t)=>L(t)>L(e)?t:e);e.exhausted=!0,e.canAttack=!1,e._frosted=!0,F.log.push(`<span class="log-special">🤖 ${r.name} uses Glacial Grasp on ${e.name}!</span>`)}else e.mana+=r.abilityCost,F.oppHeroAbilityUsed=!1;k(()=>Promise.resolve().then(()=>B).then(e=>e.renderBoard()),void 0),await new Promise(e=>setTimeout(e,400))}let i=F.player.board,a=t.map(t=>e.board.find(e=>e.uid===t)).filter(e=>e&&e.currentHp>0&&!e.exhausted);if(F.player.board.filter(e=>e.keywords?.includes(`Warden`)),i.length===0&&ke(a))for(let e of a){if(e.currentHp<=0||e.exhausted)continue;let t=e.keywords?.includes(`Apex`)?e.attack*2:e.attack;if(F.player.hp-=t,e.exhausted=!0,Y(`player`),D(`attack`),F.log.push(`<span class="log-damage">🤖 ${e.name} attacked your hero for ${t}! (LETHAL)</span>`),R(),F.gameOver)break}else{for(let n of t){let t=e.board.find(e=>e.uid===n);if(!t||t.currentHp<=0||t.exhausted)continue;let r=F.player.board,i=r.filter(e=>e.keywords?.includes(`Warden`));if(r.length>0)await Ee(t,Oe(t,i.length>0?i:r));else{let e=t.keywords?.includes(`Apex`)?t.attack*2:t.attack;F.player.hp-=e,t.exhausted=!0,Y(`player`),D(`attack`),F.log.push(`<span class="log-damage">🤖 ${t.name} attacked your hero for ${e}!</span>`),R()}if(F.gameOver)break}for(let n of t){let t=e.board.find(e=>e.uid===n);if(!(!t||t.currentHp<=0||t.exhausted)&&F.player.board.length===0){let e=t.keywords?.includes(`Apex`)?t.attack*2:t.attack;if(F.player.hp-=e,t.exhausted=!0,Y(`player`),D(`attack`),F.log.push(`<span class="log-damage">🤖 ${t.name} attacked your hero for ${e}!</span>`),R(),F.gameOver)break}}}e.deck.length>0?e.hand.push(e.deck.shift()):(e.fatigueDamage+=1,e.hp-=e.fatigueDamage,F.log.push(`<span class="log-death">💀 Opponent has no cards! Fatigue deals ${e.fatigueDamage} damage.</span>`),R()),F.opponent.board.forEach(e=>{e._unleashTemp&&=(e.keywords=e.keywords.filter(e=>e!==`Ambush`),!1)}),F.turn=`player`,F.phase=`play`,F.turnNumber++,F.heroAbilityUsed=!1,F.player.maxMana=Math.min(10,F.player.maxMana+1),F.player.mana=F.player.maxMana,F.player.board.forEach(e=>{e.canAttack=!0,e.exhausted=!1}),F.player.deck.length>0?F.player.hand.push(F.player.deck.shift()):(F.player.fatigueDamage+=1,F.player.hp-=F.player.fatigueDamage,F.log.push(`<span class="log-death">💀 You have no cards! Fatigue deals ${F.player.fatigueDamage} damage.</span>`),R()),D(`turn`),D(`card_draw`),F.log.push(`<span class="log-turn">🎮 Your turn! Mana: ${F.player.mana}</span>`),k(()=>Promise.resolve().then(()=>B).then(e=>e.renderBoard()),void 0)}function R(){F.opponent.hp<=0&&(F.gameOver=!0,F.winner=`player`,F.log.push(`🏆 You win!`),D(`victory`)),F.player.hp<=0&&(F.gameOver=!0,F.winner=`opponent`,F.log.push(`💀 You lost!`),D(`defeat`))}function Me(e=1,t=null){let n=N(e),r=P(),i=t&&S.find(e=>e.id===t)||null,a=S[Math.floor(Math.random()*S.length)],o=i?.id===`igneas`,s={turn:`player`,phase:`play`,turnNumber:1,selectedCard:null,gameOver:!1,winner:null,log:i?[`⚔️ ${i.name} enters the battle!`]:[],_opponentGoesFirst:!1,_skipOpponentManaIncrement:!1,_omenPending:null,_abilityTargeting:null,hero:i,heroAbilityUsed:!1,oppHero:a,oppHeroAbilityUsed:!1,player:{hp:20,mana:0,maxMana:0,hand:n.slice(0,5),deck:n.slice(5),board:[],graveyard:[],fatigueDamage:0},opponent:{hp:20,mana:0,maxMana:0,hand:r.slice(0,5),deck:r.slice(5),board:[],graveyard:[],fatigueDamage:0}};return Math.random()<.5?(s.turn=`opponent`,s.log.push(`🎲 Opponent goes first!`),s._opponentGoesFirst=!0,s._skipOpponentManaIncrement=!0,s.opponent.mana=o?0:1,s.opponent.maxMana=o?0:1):(s.log.push(`🎲 You go first!`),s.player.mana=1,s.player.maxMana=1,o&&(s.opponent.mana=0,s.opponent.maxMana=0,s.log.push(`🔵 Igneas passive: Opponent starts with 0 mana!`))),i?.id===`serafine`&&s.turn===`player`&&s.player.deck.length>0&&(s.player.hand.push(s.player.deck.shift()),s.log.push(`💜 Serafine's passive: You draw an extra card!`)),s}function Ne(){let e=F.hero;if(!e)return;if(F.heroAbilityUsed){F.log.push(`❌ Hero ability already used this turn.`),k(()=>Promise.resolve().then(()=>B).then(e=>e.renderBoard()),void 0);return}if(F.player.mana<e.abilityCost){F.log.push(`❌ Not enough mana for ${e.abilityName}.`),k(()=>Promise.resolve().then(()=>B).then(e=>e.renderBoard()),void 0);return}if(F.turn!==`player`)return;let t=e.abilityEffect;if(t===`foresight`){F.player.mana-=e.abilityCost,F.heroAbilityUsed=!0,F.log.push(`🔮 Serafine's Foresight activated!`),z(F.player),k(()=>Promise.resolve().then(()=>B).then(e=>e.renderBoard()),void 0);return}F._abilityTargeting=t,F.player.mana-=e.abilityCost,F.heroAbilityUsed=!0,t===`fortify`?F.log.push(`🛡️ Fortify: Click a friendly creature to give it +2 HP.`):t===`bloodprice`?F.log.push(`🩸 Blood Price: Click any creature to deal 3 damage to it.`):t===`unleash`?F.log.push(`⚡ Unleash: Click a friendly creature to give it Ambush.`):t===`glacialgrasp`&&F.log.push(`❄️ Glacial Grasp: Click an enemy creature to exhaust it.`),k(()=>Promise.resolve().then(()=>B).then(e=>e.renderBoard()),void 0)}function Pe(e){let t=F._abilityTargeting;if(!t)return!1;let n=F.player.board.find(t=>t.uid===e),r=F.opponent.board.find(t=>t.uid===e);if(t===`fortify`){if(!n)return!1;n.hp+=2,n.currentHp+=2,F.log.push(`🛡️ ${n.name} gains +2 HP from Fortify!`)}else if(t===`bloodprice`){let e=n||r;if(!e)return!1;e.currentHp-=3,--F.player.hp,F.log.push(`🩸 Blood Price deals 3 damage to ${e.name}! You lose 1 HP.`),F.player.board.forEach(e=>{e.currentHp<=0&&F.player.graveyard.push({...e})}),F.opponent.board.forEach(e=>{e.currentHp<=0&&F.opponent.graveyard.push({...e})}),F.player.board=F.player.board.filter(e=>e.currentHp>0),F.opponent.board=F.opponent.board.filter(e=>e.currentHp>0),R()}else if(t===`unleash`){if(!n)return!1;n.keywords||=[],n.keywords.push(`Ambush`),n.canAttack=!0,n._unleashTemp=!0,F.log.push(`⚡ ${n.name} gains Ambush from Unleash!`)}else if(t===`glacialgrasp`){if(!r)return!1;r.exhausted=!0,r.canAttack=!1,r._frosted=!0,F.log.push(`❄️ ${r.name} is frozen by Glacial Grasp!`)}return F._abilityTargeting=null,k(()=>Promise.resolve().then(()=>B).then(e=>e.renderBoard()),void 0),!0}function z(e){let t=e.deck;if(t.length===0)return;let n=t.splice(0,Math.min(3,t.length));F._omenPending={owner:e,cards:n},k(()=>Promise.resolve().then(()=>B).then(e=>e.showOmenModal(n)),void 0)}function Fe(e){let t=F._omenPending;if(!t)return;let{owner:n,cards:r}=t,i=r.find(t=>t.uid===e),a=r.filter(t=>t.uid!==e);n.deck.unshift(i),n.deck.push(...a),F._omenPending=null,F.log.push(`🔮 Omen resolved — card placed on top of your deck.`),k(()=>Promise.resolve().then(()=>B).then(e=>e.renderBoard()),void 0)}function Ie(){F._opponentGoesFirst&&je()}var B=t({BASE:()=>V,animateCardDeath:()=>J,animateCardHit:()=>q,animateCardLunge:()=>ze,animateCardPlayed:()=>Re,animateCardPlayedFromHand:()=>$,animateHeroHit:()=>Y,floatDamage:()=>K,renderBoard:()=>W,renderCard:()=>U,showOmenModal:()=>He,toggleGraveyard:()=>Q}),V=`/mi-tcg/`,H={uncommon:`RavenCard_Green_Frame.png`,rare:`RavenCard_Blue_Frame.png`,epic:`RavenCard_Purple_Frame.png`,legendary:`RavenCard_Frame.png`};function U(e,t=`hand`){let n=e.rarity===`legendary`,r=t===`hand`&&e.mana<=F.player.mana&&F.phase===`play`,i=t===`board`&&e.canAttack&&F.phase===`attack`&&!e.isOpponent,a=F.selectedCard&&F.selectedCard.uid===e.uid;return`
    <div class="card rarity-${e.rarity}
      ${r?`playable`:``}
      ${i?`can-attack`:``}
      ${a?`selected`:``}
      ${e.exhausted?`exhausted`:``}"
      data-uid="${e.uid}"
      data-context="${t}">
      ${n?`<div class="sparkle-container">
        <span class="sparkle">✦</span><span class="sparkle">✦</span>
        <span class="sparkle">✦</span><span class="sparkle">✦</span>
        <span class="sparkle">✦</span>
      </div>`:``}
      <div class="card-image">
        <img src="${V}cards/${e.image}" alt="${e.name}" />
        <div class="art-vignette"></div>
      </div>
      <div class="card-frame">
        <img src="${V}${H[e.rarity]}" alt="frame" />
      </div>
      <div class="card-mana">
        <img class="mana-icon-img" src="${V}pngicons/mana.png" />
        <span class="mana-number">${e.mana}</span>
      </div>
      <div class="card-name">${e.name}</div>
      <div class="card-stats">
        <div class="stat-badge attack-badge">
          <img class="badge-icon-img" src="${V}pngicons/crossed_swords.png" />
          <span class="badge-value">${e.attack}</span>
        </div>
        <div class="stat-badge defense-badge">
          <img class="badge-icon-img" src="${V}pngicons/heart.png" />
          <span class="badge-value">${e.currentHp===void 0?e.hp:e.currentHp}</span>
        </div>
      </div>
    </div>
  `}function W(){let e=F;document.querySelector(`#app`).innerHTML=`
    <div class="board">
      <div class="player-area opponent-area">
        <div class="hand-area opponent-hand">
          ${e.opponent.hand.map(()=>`<div class="card-back"></div>`).join(``)}
        </div>
        <div class="battlefield opponent-field" id="opponent-field">
          ${e.opponent.board.map(e=>U(e,`board`)).join(``)}
          ${e.opponent.board.length,``}
        </div>
        <div class="hero-info">
          <div class="hero-portrait opponent-portrait ${e.selectedCard&&e.phase===`attack`&&e.turn===`player`?`attackable-hero`:``}" id="opponent-hero"
            style="${e.oppHero?`border-color: ${e.oppHero.borderColor}; box-shadow: 0 0 12px ${e.oppHero.glowColor};`:``}">
            <div class="hero-name" style="${e.oppHero?`color: ${e.oppHero.borderColor};`:``}">
              ${e.selectedCard&&e.phase===`attack`&&e.turn===`player`?`Attack!`:e.oppHero?e.oppHero.name:`Opponent`}
            </div>
            <div class="hero-hp"><img class="hero-icon-img" src="${V}pngicons/heart.png" /> ${e.opponent.hp}</div>
          </div>
          <div class="mana-display">
            <span class="mana-label">MANA</span>
            <span class="mana-value">${e.opponent.mana}/${e.opponent.maxMana}</span>
          </div>
          <div class="graveyard-icon" id="graveyard-opponent" data-side="opponent">
            <img class="hero-icon-img" src="${V}pngicons/skull.png" /> <span class="graveyard-count">${e.opponent.graveyard.length}</span>
          </div>
          <div class="deck-icon">
            <img class="hero-icon-img" src="${V}pngicons/cards_stack.png" /> <span class="deck-count-display">${e.opponent.deck.length}</span>
          </div>
        </div>
      </div>

      <div class="board-divider">
        <div class="turn-info">
          <span class="turn-label">${e.turn===`player`?`<img class="hero-icon-img" src="${V}pngicons/crossed_swords.png" /> Your Turn`:`<img class="hero-icon-img" src="${V}pngicons/hourglass.png" /> Opponent's Turn`}</span>
          <span class="phase-label">${e.phase===`play`?`Play Phase`:`Attack Phase`}</span>
        </div>
        <div class="action-buttons">
          <button class="btn-back-menu" id="btn-back-menu">🏠 Menu</button>
          <button class="btn-mute" id="btn-mute">${ve()?`🔇`:`🔊`}</button>
          ${e.turn===`player`?`
            ${e.phase===`play`?`<button class="btn-phase" id="btn-attack-phase">Attack Phase →</button>`:``}
            ${e.phase===`attack`?`<button class="btn-end-turn" id="btn-end-turn">End Turn ⏭</button>`:``}
          `:``}
        </div>
      </div>

      <div class="player-area player-area-bottom">
        <div class="hand-area player-hand" id="player-hand">
          ${e.player.hand.map(e=>U(e,`hand`)).join(``)}
        </div>
        <div class="battlefield player-field" id="player-field">
          ${e.player.board.map(e=>U(e,`board`)).join(``)}
          ${e.player.board.length,``}
        </div>
        <div class="hero-info">
          <div class="hero-portrait player-portrait" style="${e.hero?`border-color: ${e.hero.borderColor}; box-shadow: 0 0 12px ${e.hero.glowColor};`:``}">
            <div class="hero-name" style="${e.hero?`color: ${e.hero.borderColor};`:``}">${e.hero?e.hero.name:`You`}</div>
            <div class="hero-hp"><img class="hero-icon-img" src="${V}pngicons/heart.png" /> ${e.player.hp}</div>
          </div>
          ${e.hero&&e.turn===`player`?`
            <button class="btn-hero-ability ${e.heroAbilityUsed?`used`:``} ${e._abilityTargeting?`targeting`:``}"
              id="btn-hero-ability"
              ${e.heroAbilityUsed?`disabled`:``}
              style="--hero-color: ${e.hero.borderColor}; --hero-glow: ${e.hero.glowColor};">
              <span class="ability-name">${e.hero.abilityName}</span>
              <span class="ability-cost">${e.hero.abilityCost} mana</span>
            </button>
          `:``}
          <div class="mana-display">
            <span class="mana-label">MANA</span>
            <span class="mana-value">${e.player.mana}/${e.player.maxMana}</span>
          </div>
          <div class="graveyard-icon" id="graveyard-player" data-side="player">
            <img class="hero-icon-img" src="${V}pngicons/skull.png" /> <span class="graveyard-count">${e.player.graveyard.length}</span>
          </div>
          <div class="deck-icon">
            <img class="hero-icon-img" src="${V}pngicons/cards_stack.png" /> <span class="deck-count-display">${e.player.deck.length}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="message-log" id="message-log" id="message-log">
    </div>

    ${X?Be():``}
    ${e.gameOver?`
      <div class="game-over-overlay">
        <div class="game-over-box">
          <div class="game-over-title">${e.winner===`player`?`🏆 Victory!`:`💀 Defeat`}</div>
          <div class="game-over-sub">${e.winner===`player`?`The opponent has fallen!`:`You have been defeated!`}</div>
          <button class="btn-restart" id="btn-restart">Play Again</button>
          <button class="btn-restart" id="btn-menu" style="margin-top:10px;background:linear-gradient(135deg,#1a1a2e,#16213e);border-color:#c9a84c;">🏠 Menu</button>
        </div>
      </div>
    `:``}
  `;let t=document.getElementById(`message-log`);t&&(t.innerHTML=e.log.slice(-4).map(e=>{let t=e.replace(/<[^>]+>/g,``),n=``;return n=t.includes(`💀`)||t.includes(`died`)||t.includes(`Fatigue`)||t.includes(`lost`)?`log-death`:t.includes(`⚔️`)||t.includes(`attacked`)||t.includes(`❌`)||t.includes(`damage`)?`log-damage`:t.includes(`🩸`)||t.includes(`leeched`)||t.includes(`heal`)?`log-heal`:t.includes(`⏭️`)||t.includes(`ended`)||t.includes(`🎮`)||t.includes(`🎲`)?`log-turn`:`log-special`,`<div class="log-entry ${n}">${t}</div>`}).join(``)),Ve()}function Le(e,t){G();let n={uncommon:`Uncommon`,rare:`Rare`,epic:`Epic`,legendary:`Legendary`},r={uncommon:`#6ee7b7`,rare:`#93c5fd`,epic:`#c4b5fd`,legendary:`#fcd34d`},i=document.createElement(`div`);i.className=`card-tooltip rarity-border-${e.rarity}`,i.id=`card-tooltip`,i.innerHTML=`
    <div class="tooltip-art">
      <img src="${V}cards/${e.image}" alt="${e.name}" />
      <div class="tooltip-art-vignette"></div>
      <div class="tooltip-frame">
        <img src="${V}${H[e.rarity]}" alt="" />
      </div>
      <div class="tooltip-mana">
        <img class="mana-icon-img" src="${V}pngicons/mana.png" />
        <span class="mana-number">${e.mana}</span>
      </div>
    </div>
    <div class="tooltip-body">
      <div class="tooltip-name">${e.name}</div>
      <div class="tooltip-rarity" style="color:${r[e.rarity]}">${n[e.rarity]}</div>
      <div class="tooltip-stats">
        <div class="tooltip-stat attack">
          <img class="ts-icon-img" src="${V}pngicons/crossed_swords.png" />
          <span class="ts-label">Attack</span>
          <span class="ts-value">${e.attack}</span>
        </div>
        <div class="tooltip-stat hp">
          <img class="ts-icon-img" src="${V}pngicons/heart.png" />
          <span class="ts-label">HP</span>
          <span class="ts-value">${e.currentHp===void 0?e.hp:e.currentHp}</span>
        </div>
        <div class="tooltip-stat mana">
          <img class="ts-icon-img" src="${V}pngicons/mana.png" />
          <span class="ts-label">Mana</span>
          <span class="ts-value">${e.mana}</span>
        </div>
      </div>
      <div class="tooltip-keywords">
        <div class="tooltip-section-title">Keywords</div>
        <div class="tooltip-keyword-list">${e.keywords?e.keywords.map(e=>`<span class="keyword-tag">${e}</span>`).join(``):`<span class="no-keywords">No abilities yet</span>`}</div>
      </div>
      <div class="tooltip-lore">
        <div class="tooltip-section-title">Lore</div>
        <div class="tooltip-lore-text">${e.lore||`Ancient and mysterious, this creature's origins are lost to time...`}</div>
      </div>
    </div>
  `,document.body.appendChild(i);let a=t.getBoundingClientRect(),o=a.right+12,s=a.top-40;o+260>window.innerWidth&&(o=a.left-260-12),s+420>window.innerHeight&&(s=window.innerHeight-420-60),s<8&&(s=8),i.style.left=`${o}px`,i.style.top=`${s}px`}function G(){document.getElementById(`card-tooltip`)?.remove()}function K(e,t,n=!1){let r=t.getBoundingClientRect(),i=document.createElement(`div`);i.className=`damage-number ${n?`heal-dmg`:`attack-dmg`}`,i.textContent=n?`+${e}`:`-${e}`,i.style.left=`${r.left+r.width/2-20}px`,i.style.top=`${r.top+r.height/2-20}px`,document.body.appendChild(i),setTimeout(()=>i.remove(),1200)}function q(e){let t=document.querySelector(`[data-uid="${e}"]`);t&&(t.classList.remove(`card-shake`,`card-hit`),t.offsetWidth,t.classList.add(`card-shake`,`card-hit`),K(`💥`,t),setTimeout(()=>t.classList.remove(`card-shake`,`card-hit`),400))}function J(e){return new Promise(t=>{let n=document.querySelector(`[data-uid="${e}"]`);if(!n)return t();n.classList.add(`card-dying`),setTimeout(t,600)})}function Re(e){let t=document.querySelector(`[data-uid="${e}"]`);t&&(t.classList.add(`card-played`),setTimeout(()=>t.classList.remove(`card-played`),500))}function ze(e,t=`up`){return new Promise(n=>{let r=document.querySelector(`[data-uid="${e}"]`);if(!r)return n();r.classList.add(`card-lunge-${t}`),setTimeout(()=>{r.classList.remove(`card-lunge-${t}`),n()},400)})}function Y(e){let t=document.querySelector(`.${e}-portrait`);t&&(t.classList.add(`hero-shake`,`hero-hit`),t.getBoundingClientRect(),K(`💥`,t),setTimeout(()=>t.classList.remove(`hero-shake`,`hero-hit`),500))}var X=!1,Z=`player`;function Q(e){X&&Z===e?X=!1:(X=!0,Z=e),W()}function Be(){let e=Z===`player`?F.player.graveyard:F.opponent.graveyard;return`
    <div class="graveyard-overlay" id="graveyard-overlay">
      <div class="graveyard-panel">
        <div class="graveyard-header">
          <div class="graveyard-title"><img class="hero-icon-img" src="${V}pngicons/skull.png" style="vertical-align:middle;margin-right:6px;" /> ${Z===`player`?`Your Graveyard`:`Opponent's Graveyard`}</div>
          <button class="graveyard-close" id="graveyard-close">✕</button>
        </div>
        <div class="graveyard-cards">
          ${e.length===0?`<div class="graveyard-empty">No dead creatures yet</div>`:e.map(e=>`
              <div class="graveyard-card rarity-${e.rarity}">
                <div class="thumb-image" style="width:80px;height:107px;position:relative;border-radius:6px;overflow:hidden;">
                  <img src="${V}cards/${e.image}" style="width:100%;height:100%;object-fit:cover;" />
                  <div class="thumb-frame" style="position:absolute;inset:0;">
                    <img src="${V}${H[e.rarity]}" style="width:100%;height:100%;object-fit:fill;" />
                  </div>
                  <div style="position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#7ec8ff,#1a5fa0,#0a2040);border:1px solid #90cdf4;display:flex;align-items:center;justify-content:center;font-family:Barlow,sans-serif;font-size:10px;font-weight:700;color:#fff;z-index:10;">${e.mana}</div>
                </div>
                <div style="font-family:'Passion One',sans-serif;font-size:9px;color:#f0d080;text-align:center;margin-top:4px;text-transform:uppercase;letter-spacing:0.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:80px;">${e.name}</div>
                <div style="font-family:'Barlow',sans-serif;font-size:9px;text-align:center;color:rgba(255,255,255,0.4);">⚔️${e.attack} 🩸${e.hp}</div>
              </div>
            `).join(``)}
        </div>
      </div>
    </div>
  `}function $(e,t=!1){return new Promise(n=>{let r=H[e.rarity],i=document.createElement(`div`);i.className=`card rarity-${e.rarity}`,i.style.cssText=`
      position: fixed;
      width: ${t?`60px`:`80px`};
      height: ${t?`84px`:`112px`};
      z-index: 300;
      pointer-events: none;
      border-radius: 8px;
      overflow: hidden;
      background: #000;
    `,i.innerHTML=`
      <div class="card-image" style="position:absolute;inset:0;border-radius:8px;overflow:hidden;z-index:1;">
        <img src="${V}cards/${e.image}" style="width:100%;height:100%;object-fit:cover;" />
      </div>
      <div class="card-frame" style="position:absolute;inset:0;z-index:5;pointer-events:none;">
        <img src="/${r}" style="width:100%;height:100%;object-fit:fill;" />
      </div>
    `;let a=document.querySelector(t?`.opponent-hand`:`.player-hand`),o=document.querySelector(t?`.opponent-field`:`.player-field`);if(!a||!o)return n();let s=a.getBoundingClientRect(),c=o.getBoundingClientRect();i.style.left=`${s.left+s.width/2-(t?30:40)}px`,i.style.top=`${s.top}px`,document.body.appendChild(i);let l=c.top-s.top;i.style.transition=`transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease`,requestAnimationFrame(()=>{requestAnimationFrame(()=>{i.style.transform=`translateY(${l}px) scale(1.15)`,i.style.opacity=`0.9`,setTimeout(()=>{i.style.opacity=`0`,setTimeout(()=>{i.remove(),n()},400)},350)})})})}function Ve(){document.querySelectorAll(`.card`).forEach(e=>{e.addEventListener(`mouseenter`,()=>{let t=parseInt(e.dataset.uid),n=F.player.hand.find(e=>e.uid===t)||F.player.board.find(e=>e.uid===t)||F.opponent.board.find(e=>e.uid===t);n&&Le({...r.find(e=>e.id===n.id)||{},...n},e)}),e.addEventListener(`mouseleave`,G)}),document.getElementById(`graveyard-opponent`)?.addEventListener(`click`,()=>Q(`opponent`)),document.getElementById(`graveyard-player`)?.addEventListener(`click`,()=>Q(`player`)),document.getElementById(`graveyard-close`)?.addEventListener(`click`,()=>{X=!1,W()}),document.querySelectorAll(`.card[data-context="hand"]`).forEach(e=>{e.addEventListener(`click`,()=>{Ce(parseInt(e.dataset.uid)),W()})}),document.querySelectorAll(`.card[data-context="board"]`).forEach(e=>{e.addEventListener(`click`,async()=>{let t=parseInt(e.dataset.uid);if(F._abilityTargeting){Pe(t);return}await we(t),W()})}),document.getElementById(`opponent-hero`)?.addEventListener(`click`,()=>{F.selectedCard&&F.phase===`attack`&&F.turn===`player`&&(Te(F.selectedCard.uid),W())}),document.getElementById(`btn-mute`)?.addEventListener(`click`,()=>{_e(),W()}),document.getElementById(`btn-attack-phase`)?.addEventListener(`click`,()=>{F.phase=`attack`,F.log.push(`<span class="log-damage">⚔️ Attack phase started.</span>`),W()}),document.getElementById(`btn-end-turn`)?.addEventListener(`click`,()=>{De(),W()}),document.getElementById(`btn-back-menu`)?.addEventListener(`click`,()=>{G(),n.go(`menu`)}),document.getElementById(`btn-restart`)?.addEventListener(`click`,()=>{n.go(`game`)}),document.getElementById(`btn-menu`)?.addEventListener(`click`,()=>{G(),n.go(`menu`)}),document.getElementById(`btn-hero-ability`)?.addEventListener(`click`,()=>{Ne()})}function He(e){document.getElementById(`omen-modal`)?.remove();let t=document.createElement(`div`);t.id=`omen-modal`,t.style.cssText=`
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.75);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 20px;
  `,t.innerHTML=`
    <div style="
      font-family: 'Passion One', sans-serif;
      font-size: 22px; color: #c9a84c;
      text-transform: uppercase; letter-spacing: 2px;
      text-shadow: 0 0 12px rgba(201,168,76,0.6);
    ">🔮 Omen — Choose a card to keep on top</div>
    <div style="font-family: Barlow, sans-serif; font-size: 13px; color: rgba(255,255,255,0.5); margin-top: -12px;">
      The other cards go to the bottom of your deck.
    </div>
    <div id="omen-choices" style="display: flex; gap: 20px; align-items: center;">
      ${e.map(e=>`
        <div class="omen-card-choice card rarity-${e.rarity}" data-uid="${e.uid}" style="
          cursor: pointer; position: relative;
          width: 100px; height: 140px;
          border-radius: 10px; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 0 0px rgba(201,168,76,0);
        ">
          <div style="position:absolute;inset:0;z-index:1;">
            <img src="${V}cards/${e.image}" style="width:100%;height:100%;object-fit:cover;" />
          </div>
          <div style="position:absolute;inset:0;z-index:2;">
            <img src="${V}${H[e.rarity]}" style="width:100%;height:100%;object-fit:fill;" />
          </div>
          <div style="position:absolute;top:3px;left:3px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;z-index:10;">
            <img src="${V}pngicons/mana.png" style="position:absolute;width:32px;height:32px;object-fit:contain;" />
            <span style="position:relative;z-index:2;font-family:Barlow,sans-serif;font-size:11px;font-weight:700;color:#fff;text-shadow:0 0 6px rgba(0,0,0,1),0 0 12px rgba(0,0,0,1);margin-top:4px;">${e.mana}</span>
          </div>
          <div style="position:absolute;bottom:0;left:0;right:0;z-index:10;
            background:linear-gradient(transparent,rgba(0,0,0,0.85));
            padding:4px 4px 5px;text-align:center;">
            <div style="font-family:'Passion One',sans-serif;font-size:9px;color:#f0d080;
              text-transform:uppercase;letter-spacing:0.5px;
              white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              ${e.name}
            </div>
            <div style="display:flex;align-items:center;justify-content:center;gap:6px;margin-top:2px;">
              <div style="display:flex;align-items:center;gap:2px;background:rgba(0,0,0,0.85);border:1px solid rgba(180,40,40,0.6);border-radius:4px;padding:2px 5px;">
                <img src="${V}pngicons/crossed_swords.png" style="width:10px;height:10px;" />
                <span style="font-family:Barlow,sans-serif;font-size:11px;font-weight:700;color:#ff7070;text-shadow:0 0 6px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,1);">${e.attack}</span>
              </div>
              <div style="display:flex;align-items:center;gap:2px;background:rgba(0,0,0,0.85);border:1px solid rgba(180,20,40,0.6);border-radius:4px;padding:2px 5px;">
                <img src="${V}pngicons/heart.png" style="width:10px;height:10px;" />
                <span style="font-family:Barlow,sans-serif;font-size:11px;font-weight:700;color:#ff4466;text-shadow:0 0 6px rgba(0,0,0,1),0 2px 4px rgba(0,0,0,1);">${e.hp}</span>
              </div>
            </div>
          </div>
        </div>
      `).join(``)}
    </div>
    <div style="font-family:Barlow,sans-serif;font-size:12px;color:rgba(255,255,255,0.35);">
      Click a card to place it on top of your deck
    </div>
  `,document.body.appendChild(t),t.querySelectorAll(`.omen-card-choice`).forEach(e=>{e.addEventListener(`mouseenter`,()=>{e.style.transform=`scale(1.08) translateY(-4px)`,e.style.boxShadow=`0 0 20px rgba(201,168,76,0.7)`}),e.addEventListener(`mouseleave`,()=>{e.style.transform=``,e.style.boxShadow=`0 0 0px rgba(201,168,76,0)`}),e.addEventListener(`click`,()=>{Fe(parseInt(e.dataset.uid)),t.remove()})})}n.onChange((e,t)=>{G(),e===`menu`&&x(),e===`deckbuilder`&&v(),e===`prematch`&&he(t),e===`game`&&k(()=>Promise.resolve().then(()=>A).then(e=>{let n=e.freshGame(t?.slot,t?.heroId);Object.assign(F,n),W(),n._opponentGoesFirst&&setTimeout(()=>{k(()=>Promise.resolve().then(()=>A).then(e=>e.triggerOpponentFirst()),void 0)},1200)}),void 0)}),x();export{A as n,B as t};