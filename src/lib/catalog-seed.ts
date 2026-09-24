export type SeedQcm = {
  prompt: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  explanation: string;
};

export type SeedCourse = {
  filiereSlug: "boa" | "bov" | "bch";
  niveau: 1 | 2;
  semestre: 1 | 2;
  slug: string;
  title: string;
  code: string;
  hours: number;
  description: string;
  content: string;
  resume: string;
  qcm: SeedQcm[];
  exercices: { prompt: string; solution: string }[];
  exams?: { title: string; year: number; content: string; correction: string }[];
};

export const SEED_FILIERES = [
  {
    slug: "boa",
    name: "Biologie des organismes animaux",
    shortName: "BOA",
    description:
      "De la cellule à l’organisme : zoologie, physiologie, génétique et diversité animale, ancrée dans les milieux camerounais.",
    sortOrder: 1,
  },
  {
    slug: "bov",
    name: "Biologie des organismes végétaux",
    shortName: "BOV",
    description:
      "Cytologie, botanique, physiologie et écologie des plantes — de la mangrove du Wouri à la forêt du Centre.",
    sortOrder: 2,
  },
  {
    slug: "bch",
    name: "Biochimie",
    shortName: "BCH",
    description:
      "Structure des biomolécules, enzymologie, métabolisme et techniques de laboratoire pour les sciences de la vie.",
    sortOrder: 3,
  },
] as const;

function q(
  prompt: string,
  options: [string, string, string, string],
  correct: 0 | 1 | 2 | 3,
  explanation: string,
): SeedQcm {
  return { prompt, options, correct, explanation };
}

export const SEED_COURSES: SeedCourse[] = [
  {
    filiereSlug: "boa",
    niveau: 1,
    semestre: 1,
    slug: "biologie-cellulaire",
    title: "Biologie cellulaire animale",
    code: "BIO111",
    hours: 45,
    description: "Organisation de la cellule animale, membranes, organites et cycle cellulaire.",
    content: `## La cellule, unité du vivant
La cellule animale est une unité eucaryote limitée par une membrane plasmique, dépourvue de paroi cellulosique. Le cytoplasme contient un cytosquelette (actine, microtubules, filaments intermédiaires) qui assure forme, trafic et division.

## Membrane et échanges
La membrane est une bicouche phospholipidique fluide, parsemée de protéines (transporteurs, récepteurs, enzymes). La diffusion, l’osmose, le transport facilité et le transport actif (pompe Na+/K+) règlent les échanges. L’endocytose et l’exocytose gèrent les macromolécules.

## Organites
La mitochondrie produit l’ATP par phosphorylation oxydative. Le réticulum endoplasmique rugueux synthétise les protéines destinées à l’export ; le Golgi les mature et les trie. Les lysosomes digèrent. Le noyau, limité par une enveloppe percée de pores, contient la chromatine.

## Cycle cellulaire
Interphase (G1, S, G2) puis mitose (prophase, métaphase, anaphase, télophase) et cytodiérèse. Les checkpoints G1/S et G2/M contrôlent l’intégrité de l’ADN. Une dérégulation ouvre la voie à la prolifération anarchique.`,
    resume: `La cellule animale est eucaryote, sans paroi. La membrane fluide contrôle les échanges. Mitochondries, RE, Golgi, lysosomes et noyau se partagent le travail. Le cycle G1-S-G2-M est sous checkpoints. Retenir : pompe Na+/K+, rôle du Golgi, étapes de la mitose.`,
    qcm: [
      q("Quel organite produit l’essentiel de l’ATP cellulaire ?", ["Lysosome", "Mitochondrie", "Appareil de Golgi", "Peroxysome"], 1, "La chaîne respiratoire mitochondriale réalise la phosphorylation oxydative."),
      q("La pompe Na+/K+ est un exemple de :", ["Diffusion simple", "Osmose", "Transport actif", "Endocytose"], 2, "Elle consomme de l’ATP pour pomper contre le gradient."),
      q("La phase S du cycle cellulaire correspond à :", ["La cytodiérèse", "La réplication de l’ADN", "L’alignement des chromosomes", "L’apoptose"], 1, "S = synthèse, donc duplication du génome."),
      q("La cellule animale se distingue de la cellule végétale par :", ["La présence d’un noyau", "L’absence de paroi pectocellulosique", "La présence de ribosomes", "L’ADN double brin"], 1, "Les cellules animales n’ont pas de paroi cellulosique ni de chloroplastes."),
    ],
    exercices: [
      {
        prompt: "Comparez transport passif et transport actif à travers la membrane plasmique. Donnez un exemple de chacun.",
        solution:
          "Passif : selon le gradient, sans ATP (diffusion de l’O2, canaux ioniques). Actif : contre le gradient, coût ATP (pompe Na+/K+). L’osmose est un cas particulier de diffusion de l’eau.",
      },
      {
        prompt: "Expliquez pourquoi un checkpoint G2/M défaillant peut favoriser une tumeur.",
        solution:
          "Le checkpoint G2/M bloque l’entrée en mitose si l’ADN est endommagé. S’il échoue, des cellules au génome altéré se divisent, accumulent des mutations et peuvent s’engager dans une prolifération tumorale.",
      },
    ],
    exams: [
      {
        title: "Épreuve de biologie cellulaire — session normale",
        year: 2024,
        content: `Durée : 2 h. Aucun document autorisé.

1. Schématisez une cellule animale et légendez 8 structures (6 pts).
2. Décrivez le trajet d’une protéine de sécrétion du ribosome à l’exocytose (6 pts).
3. Distinguez mitose et méiose (points communs et différences) (8 pts).`,
        correction: `1. Membrane, cytoplasme, noyau, nucléole, mitochondrie, RE, Golgi, centrosome.
2. Traduction au RE rugueux → lumen RE → vésicules → cis-Golgi → maturation → trans-Golgi → vésicules de sécrétion → fusion membranaire.
3. Mitose : 1 division, cellules 2n identiques. Méiose : 2 divisions, cellules n, crossing-over, réduction chromatique.`,
      },
    ],
  },
  {
    filiereSlug: "boa",
    niveau: 1,
    semestre: 1,
    slug: "chimie-generale",
    title: "Chimie générale pour biologistes",
    code: "CHM111",
    hours: 40,
    description: "Atomes, liaisons, solutions aqueuses, pH et équilibres utiles en biologie.",
    content: `## Atome et classification
L’atome (protons, neutrons, électrons) se range dans le tableau périodique. La configuration électronique commande la valence. C, H, O, N, P, S forment le vivant.

## Liaisons
Liaison covalente (partage), ionique (transfert), hydrogène (électrostatique directionnelle) et van der Waals. L’eau, dipôle, solvate les ions et impose la structure des protéines et des acides nucléiques.

## Solutions et pH
Une solution aqueuse se caractérise par la concentration molaire. Le pH = −log[H3O+]. Un acide de Brønsted cède un proton ; une base en capte. Les tampons (acide faible / base conjuguée) stabilisent le pH du cytosol et du sang (couple H2CO3 / HCO3−).

## Équilibres
La constante K indique le sens spontané. En biologie, beaucoup de réactions sont couplées à l’hydrolyse de l’ATP pour devenir favorables.`,
    resume: `C, H, O, N, P, S : atomes du vivant. L’eau et les liaisons H structurent les macromolécules. pH = −log[H3O+]. Tampons biologiques. L’ATP couple les réactions défavorables.`,
    qcm: [
      q("Le pH d’une solution où [H3O+] = 10⁻⁷ mol·L⁻¹ vaut :", ["1", "7", "14", "0"], 1, "pH = −log(10⁻⁷) = 7, neutralité à 25 °C."),
      q("Quelle liaison maintient les brins de l’ADN appariés ?", ["Covalente peptidique", "Ionique forte", "Hydrogène", "Disulfure"], 2, "Les paires A-T et G-C tiennent par liaisons hydrogène."),
      q("Le couple H2CO3 / HCO3− est un tampon :", ["Du suc gastrique", "Du sang", "De l’urine uniquement", "Des lysosomes"], 1, "C’est le principal tampon du plasma."),
      q("L’hydrolyse de l’ATP est utilisée pour :", ["Augmenter le pH", "Rendre une réaction couplée favorable", "Détruire l’eau", "Fixer le CO2"], 1, "Le ΔG négatif de l’hydrolyse tire une réaction endergonique."),
    ],
    exercices: [
      {
        prompt: "Calculez le pH d’une solution d’HCl 0,01 mol·L⁻¹ (acide fort).",
        solution: "[H3O+] = 0,01 = 10⁻² mol·L⁻¹ donc pH = 2.",
      },
    ],
  },
  {
    filiereSlug: "boa",
    niveau: 1,
    semestre: 1,
    slug: "histologie-animale",
    title: "Histologie animale",
    code: "BIO112",
    hours: 40,
    description: "Les quatre tissus fondamentaux et leur lecture au microscope.",
    content: `## Quatre tissus
Épithéliums (revêtement, glandes), tissu conjonctif (soutien, matrice), tissu musculaire (squelettique, lisse, cardiaque) et tissu nerveux (neurones et glie).

## Épithéliums
Cellules jointives sur une lame basale. Simples ou stratifiés ; pavimenteux, cubiques, prismatiques. Spécialisations : microvillosités, cils, kératine.

## Conjonctif et muscle
Le conjonctif proprement dit, le cartilage, l’os et le sang dérivent du mésenchyme. Le muscle strié squelettique est multinucleé, volontaire ; le cardiaque est strié, autonome, à disques intercalaires ; le lisse est fusiforme, viscéral.

## Lecture de lame
Coloration HES : noyaux basophiles, cytoplasme éosinophile. Toujours situer l’organe, le tissu, puis la cellule.`,
    resume: `Quatre tissus. Épithélium = jointif + lame basale. Conjonctif = matrice. Muscle : 3 types. Nerveux : neurone + glie. HES : noyau bleu-violet, cytoplasme rose.`,
    qcm: [
      q("Un épithélium repose toujours sur :", ["Un cartilage", "Une lame basale", "Un sarcomère", "Une myéline"], 1, "La lame basale ancre l’épithélium au conjonctif."),
      q("Le muscle cardiaque se distingue par :", ["L’absence de stries", "Les disques intercalaires", "Des cellules multinucleées périphériques", "Une commande volontaire exclusive"], 1, "Les disques intercalaires couplent électriquement les cardiomyocytes."),
      q("La coloration HES rend les noyaux :", ["Éosinophiles", "Basophiles", "Argentaffines", "Transparents"], 1, "L’hématoxyline, basique, fixe les acides nucléiques."),
      q("Le sang est classé comme :", ["Épithélium", "Tissu conjonctif spécialisé", "Tissu nerveux", "Parenchyme glandulaire"], 1, "C’est un conjonctif à matrice liquide (plasma)."),
    ],
    exercices: [
      {
        prompt: "Sur une lame d’intestin grêle, quels tissus identifiez-vous de la lumière vers la séreuse ?",
        solution:
          "Épithélium prismatique à plateau strié + caliciformes → chorion (conjonctif) des villosités → musculeuse (lisse, deux couches) → séreuse péritonéale.",
      },
    ],
  },
  {
    filiereSlug: "boa",
    niveau: 1,
    semestre: 2,
    slug: "embryologie",
    title: "Embryologie animale",
    code: "BIO121",
    hours: 40,
    description: "De la fécondation à la gastrulation : les grandes étapes du développement.",
    content: `## Gamétogenèse et fécondation
La méiose produit des gamètes haploïdes. Chez les mammifères, la fécondation (rencontre, réaction acrosomique, fusion) rétablit la diploidie et déclenche l’activation de l’œuf.

## Segmentation
Divisions rapides sans croissance : morula puis blastula (blastocyste chez l’humain, avec masse interne et trophectoderme).

## Gastrulation
Mise en place des trois feuillets : ectoderme (épiderme, système nerveux), mésoderme (muscles, squelette, sang, reins), endoderme (tube digestif, poumons). La neurulation forme le tube neural.

## Annexes
Chez les amniotes : amnios, chorion, allantoïde, sac vitellin. Le placenta mammifère assure les échanges mère-fœtus.`,
    resume: `Fécondation → segmentation → blastula → gastrulation (3 feuillets) → neurulation. Ectoderme / mésoderme / endoderme. Annexes extra-embryonnaires chez les amniotes.`,
    qcm: [
      q("Le système nerveux dérive :", ["De l’endoderme", "Du mésoderme", "De l’ectoderme", "Du trophectoderme seul"], 2, "La plaque neurale est ectodermique."),
      q("La gastrulation met en place :", ["Les gamètes", "Les trois feuillets embryonnaires", "Le placenta uniquement", "La morula"], 1, "C’est la morphogenèse des feuillets."),
      q("Chez l’humain, la masse interne du blastocyste donnera :", ["Le placenta seulement", "L’embryon", "La zone pellucide", "Le corona radiata"], 1, "L’embryoblaste forme l’embryon ; le trophectoderme participe au placenta."),
      q("La méiose produit :", ["Des cellules 2n identiques", "Des gamètes n", "Des cellules souches totipotentes uniquement", "Des neurones"], 1, "Réduction chromatique : 2n → n."),
    ],
    exercices: [
      {
        prompt: "Attribuez chaque structure à son feuillet : épiderme, foie, myocarde, encéphale, intestin.",
        solution: "Épiderme et encéphale : ectoderme. Myocarde : mésoderme. Foie et intestin : endoderme.",
      },
    ],
    exams: [
      {
        title: "Contrôle d’embryologie — rattrapage",
        year: 2023,
        content: "1. Décrivez la fécondation chez les mammifères (8 pts).\n2. Qu’est-ce que la neurulation ? (6 pts).\n3. Rôle du placenta (6 pts).",
        correction:
          "1. Capacitation, reconnaissance zona pellucida, acrosome, fusion, bloc à la polyspermie, amphimixie. 2. Plaque → gouttière → tube neural, crêtes neurales. 3. Échanges gazeux, nutriments, hormones, barrière partielle.",
      },
    ],
  },
  {
    filiereSlug: "boa",
    niveau: 1,
    semestre: 2,
    slug: "invertebres-intro",
    title: "Diversité des invertébrés",
    code: "ZOO121",
    hours: 40,
    description: "Grands embranchements d’invertébrés, avec un regard sur la faune camerounaise.",
    content: `## Ce que « invertébré » veut dire
Groupe paraphylétique : tous les Métazoaires sans colonne vertébrale. On les organise par symétrie, couches germinatives, cœlome et développement.

## Porifères et cnidaires
Éponges : filtration, pas de vrais tissus. Cnidaires (méduses, coraux, hydres) : diploblastiques, cnidocytes, cycle polype/méduse.

## Lophotrochozoaires et ecdysozoaires
Plathelminthes, annélides (vers de vase des estuaires du Wouri), mollusques (gastéropodes, bivalves, céphalopodes). Ecdysozoaires : nématodes et arthropodes (insectes, crustacés, arachnides) — l’essentiel de la biodiversité animale.

## Échinodermes
Symétrie pentaradiée secondaire, système aquifère : étoiles de mer, oursins des côtes de Kribi.`,
    resume: `Invertébré = sans vertèbres, groupe artificiel. Clés : feuillets, cœlome, mue. Arthropodes = majorité des espèces. Relier aux milieux : mangrove, forêt, côte.`,
    qcm: [
      q("Les arthropodes se caractérisent par :", ["Un manteau et une radula", "Un exosquelette chitineux et des appendices articulés", "Un système aquifère", "L’absence de tissus"], 1, "Chitine + articulations + mue (ecdysis)."),
      q("Les cnidaires sont :", ["Triploblastiques", "Diploblastiques", "Sans cellules", "Des chordés"], 1, "Deux feuillets : ectoderme et endoderme, + mésoglée."),
      q("Un annélide est typiquement :", ["Segmenté (métamérie)", "Pentaradié", "Sans tube digestif", "Unicellulaire"], 0, "Le corps est une série de métamères."),
      q("Les échinodermes adultes ont une symétrie :", ["Bilatérale primaire", "Pentaradiée", "Sphérique", "Absente"], 1, "Secondairement radiée ; la larve est bilatérale."),
    ],
    exercices: [
      {
        prompt: "Proposez une clé simplifiée pour classer une « bête » récoltée en mangrove : coquille, segments, pattes articulées, ou pores.",
        solution:
          "Coquille → mollusque. Segments + soies sans pattes → annélide. Pattes articulées + cuticule → arthropode. Pores et filtration, pas de symétrie claire → porifère.",
      },
    ],
  },
  {
    filiereSlug: "boa",
    niveau: 1,
    semestre: 2,
    slug: "physio-intro",
    title: "Introduction à la physiologie animale",
    code: "PHY121",
    hours: 35,
    description: "Homéostasie, milieux intérieurs et grandes fonctions.",
    content: `## Homéostasie
Claude Bernard : la fixité du milieu intérieur. Boucles de rétrocontrôle (négatif surtout) maintiennent température, glycémie, pression artérielle, pH.

## Milieux
Liquide intracellulaire vs extracellulaire (plasma + interstitiel). Les échanges transcapillaires (Starling) nourrissent les cellules.

## Grandes fonctions
Respiration (hématose), circulation, digestion-absorption, excrétion, intégration nerveuse et hormonale. Un organe sert souvent plusieurs fonctions.

## Adaptation
Endothermie vs ectothermie. En zone équatoriale, la thermorégulation vise surtout à évacuer la chaleur (sudation, vasodilatation).`,
    resume: `Homéostasie = rétrocontrôle. Deux compartiments hydriques. Respiration, circulation, digestion, excrétion, régulation. Adapter les exemples au climat tropical.`,
    qcm: [
      q("Un rétrocontrôle négatif :", ["Amplifie l’écart", "Réduit l’écart à la consigne", "N’existe que chez les plantes", "Remplace les hormones"], 1, "C’est le principe de l’homéostasie."),
      q("Le plasma appartient au compartiment :", ["Intracellulaire", "Extracellulaire", "Luminal digestif", "Nucléaire"], 1, "Le plasma est la partie liquide du sang, extracellulaire."),
      q("L’hématose désigne :", ["La digestion des hématies", "Les échanges gazeux alvéolo-capillaires", "La synthèse d’hémoglobine", "La coagulation"], 1, "O2 entre, CO2 sort, au niveau pulmonaire."),
      q("La sudation sert principalement à :", ["Augmenter la natrémie", "Perdre de la chaleur par évaporation", "Fixer l’oxygène", "Activer la thyroïde"], 1, "L’évaporation cutanée dissipe de la chaleur."),
    ],
    exercices: [
      {
        prompt: "Schématisez la boucle de régulation de la glycémie après un repas.",
        solution:
          "↑ glucose → cellules β pancréatiques → insuline → captation musculaire/adipeuse et glycogénogenèse hépatique → retour de la glycémie. C’est un rétrocontrôle négatif.",
      },
    ],
  },
  {
    filiereSlug: "boa",
    niveau: 2,
    semestre: 1,
    slug: "zoo-invertebres",
    title: "Zoologie des invertébrés",
    code: "ZOO211",
    hours: 50,
    description: "Morphologie comparée et classification des grands embranchements.",
    content: `## Plan d’organisation
Symétrie, céphalisation, cœlome, métamérie, systèmes (nerveux, circulatoire ouvert/fermé). On compare pour reconstruire la phylogénie (clades Lophotrochozoa, Ecdysozoa, Deuterostomia).

## Mollusques
Tête-pied-masse viscérale, manteau, radula (sauf bivalves). En mangrove : huîtres, palourdes, gastéropodes pulmonés.

## Arthropodes
Tagmatisation, exosquelette, mue. Insectes : 3 paires de pattes, souvent 2 paires d’ailes, métamorphose. Enjeux : vecteurs (anophèle, glossine), ravageurs, pollinisateurs.

## Phylogénie moderne
Les « vers » ne forment pas un clade. On s’appuie sur les données moléculaires autant que sur l’anatomie.`,
    resume: `Comparer les plans d’organisation. Mollusques : manteau + radula. Arthropodes : cuticule et tagmes. Oublier les groupes paraphylétiques (vers, invertébrés) en phylogénie stricte.`,
    qcm: [
      q("Un système circulatoire fermé se rencontre chez :", ["Les insectes", "Les annélides", "La plupart des mollusques bivalves", "Les cnidaires"], 1, "Les annélides ont un réseau d’vaisseaux clos ; les insectes ont une hémolymphe dans une cavité."),
      q("La radula est :", ["Un dard de cnidaire", "Une râpe buccale de mollusque", "Une patte d’insecte", "Un os d’échinoderme"], 1, "Bande chitineuse dentée, absente chez les bivalves."),
      q("Les insectes ont :", ["Quatre paires de pattes", "Trois paires de pattes thoraciques", "Des chélicères", "Cinq paires de pattes marcheuses"], 1, "Hexapodes : 3 paires."),
      q("Lophotrochozoa regroupe notamment :", ["Insectes et nématodes", "Mollusques et annélides", "Échinodermes et chordés", "Spongiaires"], 1, "Clade défini par des caractères larvaires et moléculaires."),
    ],
    exercices: [
      {
        prompt: "Pourquoi l’anophèle intéresse-t-il le zoologiste médical au Cameroun ?",
        solution:
          "Genre de moustique (Diptera, Culicidae) vecteur de Plasmodium, agent du paludisme. La femelle hématophage transmet le parasite. La connaissance du cycle et des gîtes guide la lutte.",
      },
    ],
    exams: [
      {
        title: "Épreuve de zoologie des invertébrés",
        year: 2025,
        content: "1. Comparez insecte et crustacé (8).\n2. Plan d’organisation d’un gastéropode (6).\n3. Intérêt des nématodes (6).",
        correction:
          "1. Tagmes, appendices, milieu, respiration (trachées vs branchies), antennes. 2. Torsion, coquille univalve, pied, radula. 3. Parasites (ascaris, filaires), modèles, ravageurs de cultures.",
      },
    ],
  },
  {
    filiereSlug: "boa",
    niveau: 2,
    semestre: 1,
    slug: "genetique",
    title: "Génétique fondamentale",
    code: "GEN211",
    hours: 45,
    description: "Mendel, liaison, ADN, et introduction aux populations.",
    content: `## Mendel
Lois de ségrégation et d’indépendance. Dominant/récessif, homo/hétérozygote, test-cross. Les exceptions : codominance, gènes liés, épistasie.

## Chromosomes
Gène = locus. Crossing-over en prophase I. Détermination sexuelle. Mutations ponctuelles, chromosomiques.

## Du gène à la protéine
ADN → transcription → ARN → traduction. Code génétique dégénéré. Une mutation n’est pas toujours visible (silence, environnement).

## Populations
Fréquences alléliques, Hardy-Weinberg (panmixie, pas de sélection/migration/mutation/dérive). Base pour comprendre drépanocytose et paludisme.`,
    resume: `Mendel + exceptions. Locus, allèles, liaison. Dogme ADN-ARN-protéine. H-W comme modèle nul. Relier à la drépanocytose (avantage hétérozygote en zone palustre).`,
    qcm: [
      q("Un test-cross croise un individu de phénotype dominant avec :", ["Un homozygote dominant", "Un homozygote récessif", "Un autre hétérozygote uniquement", "Une cellule somatique"], 1, "Le récessif homozygote révèle la gamète de l’inconnu."),
      q("Hardy-Weinberg suppose notamment :", ["Une forte sélection", "La panmixie et l’absence de forces évolutives", "Un effectif très petit", "La migration constante"], 1, "Modèle nul des fréquences constantes."),
      q("Une mutation silencieuse :", ["Change toujours la protéine", "Ne change pas l’acide aminé (dégénérescence du code)", "Supprime le chromosome", "Est forcément létale"], 1, "Plusieurs codons pour le même AA."),
      q("L’avantage de l’hétérozygote AS en zone palustre illustre :", ["La dérive pure", "Une sélection balancée", "L’indépendance mendélienne", "Un gène lié au sexe uniquement"], 1, "SS drépanocytaire, AA sensible au paludisme, AS avantagé."),
    ],
    exercices: [
      {
        prompt: "Un couple de phénotype [A] a un enfant [a]. Quels sont les génotypes parentaux les plus probables (caractère autosomique récessif) ?",
        solution: "Les deux parents sont hétérozygotes Aa. Probabilité 1/4 d’enfant aa.",
      },
    ],
  },
  {
    filiereSlug: "boa",
    niveau: 2,
    semestre: 1,
    slug: "stats-bio",
    title: "Statistiques biologiques",
    code: "STA211",
    hours: 35,
    description: "Décrire, tester, et ne pas se tromper d’hypothèse en biologie.",
    content: `## Variables
Qualitatives / quantitatives, discrètes / continues. Population vs échantillon. Biais de recrutement.

## Descriptif
Moyenne, médiane, variance, écart-type, intervalle interquartile. Un graphe clair (histogramme, boîte) vaut mieux qu’un tableau opaque.

## Inférence
Hypothèse nulle H0, risque α (souvent 5 %). Tests t, χ², corrélation. p-value : probabilité d’un résultat au moins aussi extrême si H0 est vraie — pas la « proba que H0 soit vraie ».

## Bonnes pratiques
Taille d’échantillon, indépendance des observations, ne pas p-hacker. En écologie de terrain (Douala, forêt), les données sont souvent non gaussiennes : penser non-paramétrique.`,
    resume: `Décrire avant de tester. H0, α, p-value (bien la lire). t, χ². Médiane si distribution asymétrique. Graphiques d’abord.`,
    qcm: [
      q("La p-value est :", ["La proba que H0 soit vraie", "La proba d’observer un résultat au moins aussi extrême si H0 est vraie", "Toujours 0,05", "L’écart-type"], 1, "Définition fréquentiste classique."),
      q("Pour comparer deux moyennes gaussiennes appariées on utilise plutôt :", ["Un χ² d’indépendance", "Un t apparié", "Une régression logistique obligatoire", "La médiane seule"], 1, "t apparié (avant/après, mêmes individus)."),
      q("La médiane est préférable à la moyenne quand :", ["n = 2", "La distribution est très asymétrique ou à valeurs extrêmes", "Tout est gaussien parfait", "On teste une variance"], 1, "Robuste aux outliers."),
      q("Un risque α de 5 % signifie :", ["On se trompe 5 fois sur 100 quand H0 est vraie (erreur de type I)", "La puissance est 95 %", "β = 0,05", "L’échantillon vaut 5 % de la population"], 0, "α = seuil de faux positif sous H0."),
    ],
    exercices: [
      {
        prompt: "On compte 40 moustiques infectés sur 200. Donnez la fréquence observée et un intervalle de confiance approximatif à 95 % (formule p ± 1,96√(p(1-p)/n)).",
        solution: "p = 0,20. SE = √(0,2×0,8/200) = 0,0283. IC ≈ [0,145 ; 0,255].",
      },
    ],
  },
  {
    filiereSlug: "boa",
    niveau: 2,
    semestre: 2,
    slug: "zoo-vertebres",
    title: "Zoologie des vertébrés",
    code: "ZOO221",
    hours: 50,
    description: "Chordés, poissons aux mammifères, faune camerounaise incluse.",
    content: `## Chordés
Notocorde, tube neural dorsal, fentes pharyngées, queue post-anale. Vertébrés : colonne, crâne, (en général) mâchoires.

## Poissons et amphibiens
Agnathes, chondrichtyens, ostéichtyens. Amphibiens : peau nue, métamorphose, œufs sans coquille — très sensibles à la pollution des bas-fonds de Douala.

## Amniotes
Reptiles, oiseaux, mammifères. Œuf amniotique = conquête du milieu terrestre. Oiseaux : endothermie, plumes. Mammifères : poils, glandes mammaires, trois osselets.

## Cameroun
Grande diversité : poissons du Wouri, amphibiens forestiers, oiseaux du mont Cameroun, primates (dont le drill). Menaces : habitat, braconnage, pollution.`,
    resume: `Caractères des chordés puis des vertébrés. Amniotes vs amphibiens. Relier chaque clade à un exemple local. Endothermie = oiseaux + mammifères.`,
    qcm: [
      q("Un caractère de chordé est :", ["Un exosquelette chitineux", "Un tube neural dorsal", "Un système aquifère", "La radula"], 1, "Tube neural creux, dorsal, au-dessus de la notocorde."),
      q("Les amniotes se distinguent par :", ["Les branchies adultes", "Les annexes extra-embryonnaires (amnios…)", "L’absence de vertèbres", "La métamorphose obligatoire"], 1, "L’œuf amniotique (ou son équivalent placentaire)."),
      q("Les oiseaux sont phylogénétiquement :", ["Un groupe frère de tous les reptiles", "Des dinosaures théropodes", "Des mammifères volants", "Des amphibiens"], 1, "Clade inclus dans les dinosaures."),
      q("La peau nue et perméable des amphibiens implique :", ["Une indépendance totale vis-à-vis de l’eau", "Une forte sensibilité à la dessiccation et aux polluants", "Une endothermie stricte", "Des plumes"], 1, "Respiration cutanée = vulnérabilité."),
    ],
    exercices: [
      {
        prompt: "Dressez un tableau : requin / grenouille / lézard / chauve-souris — tégument, thermorégulation, reproduction.",
        solution:
          "Requin : écailles placoides, ectotherme, ovipare ou ovovivipare, milieu aquatique. Grenouille : peau nue, ectotherme, œufs en eau. Lézard : écailles cornées, ectotherme, œuf amniotique. Chauve-souris : poils, endotherme, viviparité, lait.",
      },
    ],
  },
  {
    filiereSlug: "boa",
    niveau: 2,
    semestre: 2,
    slug: "physio-animale",
    title: "Physiologie animale",
    code: "PHY221",
    hours: 50,
    description: "Nerfs, muscles, circulation, respiration, rein.",
    content: `## Potentiel d’action
Membrane excitable, potentiel de repos (−70 mV), ouverture Na+ voltage-dépendants, repolarisation K+, période réfractaire. Synapse chimique : neurotransmetteur, potentiel post-synaptique.

## Muscle
Couplage excitation-contraction, glissement actine-myosine, rôle du Ca2+. Sommation, tétanos, unités motrices.

## Cœur et sang
Pacemaker sinusal, cycle cardiaque, débit = FC × VES. Transport de l’O2 par l’hémoglobine, effet Bohr.

## Rein
Néphron : filtration glomérulaire, réabsorption, sécrétion. ADH et aldostérone. Lien pression-volume.`,
    resume: `PA = Na+ puis K+. Synapse chimique. Muscle : Ca2+ et ponts actine-myosine. Débit cardiaque. Hb et effet Bohr. Néphron et hormones de l’eau/Na+.`,
    qcm: [
      q("La dépolarisation du neurone est due principalement à :", ["L’entrée de Na+", "La sortie de Na+", "L’entrée de K+", "La pompe seule"], 0, "Canaux Na+ voltage-dépendants."),
      q("L’effet Bohr désigne :", ["La saturation fixe de l’Hb", "La baisse d’affinité de l’Hb pour l’O2 quand le pH diminue / le CO2 augmente", "La filtration glomérulaire", "Le tétanos musculaire"], 1, "Favorise le largage d’O2 dans les tissus actifs."),
      q("L’ADH agit surtout :", ["En augmentant la perméabilité à l’eau du tube collecteur", "En détruisant le glomérule", "En bloquant l’aldostérone uniquement", "Sur le pacemaker"], 0, "Aquaporines du collecteur, concentration de l’urine."),
      q("Le débit cardiaque est :", ["Pression × résistance", "Fréquence × volume d’éjection systolique", "pH × Hb", "Na+ × K+"], 1, "DC = FC × VES."),
    ],
    exercices: [
      {
        prompt: "Expliquez en cinq phrases le couplage excitation-contraction squelettique.",
        solution:
          "PA membranaire → tubules T → récepteurs DHP → libération de Ca2+ du réticulum sarcoplasmique → Ca2+ se lie à la troponine C → tropomyosine bascule → ponts actine-myosine → contraction. Recapture du Ca2+ = relâchement.",
      },
    ],
    exams: [
      {
        title: "Épreuve de physiologie animale",
        year: 2024,
        content: "1. Potentiel d’action (8).\n2. Cycle cardiaque (6).\n3. Formation de l’urine (6).",
        correction: "1. Resting, seuil, Na_in, K_out, réfractaire, myelinisation. 2. Systole/diastole, bruits, ECG sommaire. 3. Filtration, réabsorption (proximal, anse, distal), sécrétion, ADH.",
      },
    ],
  },
  {
    filiereSlug: "boa",
    niveau: 2,
    semestre: 2,
    slug: "immunologie",
    title: "Immunologie générale",
    code: "IMM221",
    hours: 40,
    description: "Inné, adaptatif, vaccins — et le paludisme en toile de fond.",
    content: `## Inné
Barrières, phagocytes, complément, inflammation, interférons. Reconnaissance de motifs (PAMP) par des récepteurs (TLR). Rapide, peu spécifique.

## Adaptatif
Lymphocytes B (anticorps) et T (CD4 auxiliaires, CD8 cytotoxiques). Spécificité, mémoire, MHC. La sélection clonale explique la diversité.

## Vaccins
Antigène atténué, inactivé, sous-unité, ARNm. Objectif : mémoire sans maladie. Couverture vaccinale = bien collectif.

## Terrain
Le paludisme, la tuberculose, le VIH : trois dossiers d’immunopathologie à connaître en Afrique centrale, sans se substituer aux cours cliniques.`,
    resume: `Inné rapide / adaptatif spécifique et mémoire. B = humoral, T = cellulaire. MHC, sélection clonale. Vaccin = mémoire provoquée.`,
    qcm: [
      q("Les lymphocytes T CD8 reconnaissent l’antigène présenté par :", ["Le MHC I", "Le MHC II uniquement", "Les anticorps circulants", "Le complément C3 seul"], 0, "MHC I : presque toutes les cellules nucléées, voie cytotoxique."),
      q("Un anticorps est produit par :", ["Les neutrophiles", "Les plasmocytes (B différenciés)", "Les érythrocytes", "Les kératinocytes"], 1, "Les B activés deviennent plasmocytes sécréteurs."),
      q("L’immunité innée est :", ["Lente et très spécifique", "Rapide et peu spécifique", "Uniquement vaccinale", "Absente chez l’humain"], 1, "Première ligne, motifs moléculaires."),
      q("La mémoire immunitaire permet :", ["D’ignorer le second contact", "Une réponse secondaire plus rapide et plus intense", "D’éliminer le MHC", "La phagocytose uniquement"], 1, "Principe de la vaccination."),
    ],
    exercices: [
      {
        prompt: "Pourquoi un vaccin contre Plasmodium est-il difficile ?",
        solution:
          "Cycle complexe (foie, sang, moustique), variation antigénique, stade intra-érythrocytaire peu visible, immunité naturelle incomplète. D’où des vaccins à efficacité partielle (RTS,S, R21) en complément des moustiquaires.",
      },
    ],
  },
  {
    filiereSlug: "bov",
    niveau: 1,
    semestre: 1,
    slug: "cytologie-vegetale",
    title: "Cytologie végétale",
    code: "VEG111",
    hours: 45,
    description: "La cellule végétale : paroi, vacuoles, plastes, plasmodesmes.",
    content: `## Spécificités
Paroi pectocellulosique (cellulose, hémicelluloses, pectines), lamelle moyenne, parfois lignine. Vacuole unique occupante, tonoplaste, pression de turgescence. Plastes : chloroplastes, amyloplastes, chromoplastes.

## Communications
Plasmodesmes : manchons cytoplasmiques à travers la paroi, reticulum en desmotubule. Le symplaste vs l’apoplaste.

## Division
Phagmoplaste et plaque cellulaire (cytodiérèse centrifuge), contrairement au sillon animal. La vacuole se partage.

## Photosynthèse, aperçu
Les thylakoïdes des chloroplastes captent la lumière. Détail au semestre suivant, mais la localisation s’apprend ici.`,
    resume: `Paroi + vacuole + plastes = signature végétale. Turgescence. Plasmodesmes (symplaste). Cytodiérèse par plaque cellulaire.`,
    qcm: [
      q("La turgescence dépend surtout :", ["Du chloroplaste", "De la vacuole et de la paroi", "Du centrosome", "Des lysosomes"], 1, "Entrée d’eau → pression contre la paroi."),
      q("Les plasmodesmes relient :", ["Deux vacuoles fermées", "Les cytoplasmes de cellules voisines", "Le xylème au phloème uniquement", "Le noyau à la mitochondrie"], 1, "Continuité symplastique."),
      q("Un amyloplaste :", ["Fait la photosynthèse", "Stocke l’amidon", "Digère les protéines", "Produit des anticorps"], 1, "Plaste de réserve, organes souterrains."),
      q("La cytodiérèse végétale se fait par :", ["Sillon contractile", "Formation d’une plaque cellulaire", "Bourgeonnement", "Simple caryocinèse"], 1, "Vésicules golgiennes au phagmoplaste."),
    ],
    exercices: [
      {
        prompt: "Que se passe-t-il si l’on place une cellule turgescente dans une solution hypertonique ?",
        solution: "Plasmolyse : l’eau sort, la vacuole se rétracte, le protoplaste se décolle de la paroi. La plante flétrit.",
      },
    ],
  },
  {
    filiereSlug: "bov",
    niveau: 1,
    semestre: 1,
    slug: "botanique-generale",
    title: "Botanique générale",
    code: "VEG112",
    hours: 40,
    description: "Méristèmes, organes, cycles de vie des embryophytes.",
    content: `## Méristèmes
Tissus embryonnaires : apical caulinaire et racinaire, cambiums (secondaire). Croissance indéfinie.

## Organes
Racine (ancrage, absorption), tige (port, conduction), feuille (photosynthèse). Fleur = axe raccourci porteur de sporophylles chez les angiospermes.

## Cycles
Alternance sporophyte (2n) / gamétophyte (n). Chez les angiospermes, le gamétophyte est réduit (sac embryonnaire, pollen). Double fécondation : zygote + albumen.

## Classification sommaire
Bryophytes, ptéridophytes, gymnospermes, angiospermes. Au Cameroun, dominance des angiospermes forestières et cultivées (manioc, plantain, cacao).`,
    resume: `Méristèmes = croissance. Racine-tige-feuille-fleur. Alternance de phases, double fécondation. Angiospermes = plantes à fleurs et fruits.`,
    qcm: [
      q("La double fécondation des angiospermes produit :", ["Deux zygotes identiques", "Un zygote et un albumen", "Uniquement du pollen", "Deux sporophytes haploïdes"], 1, "n+n = zygote 2n ; n+2n = albumen 3n (classique)."),
      q("Un méristème apical :", ["Est un tissu mort lignifié", "Assure la croissance en longueur", "Est propre aux animaux", "Remplace toujours le cambium"], 1, "Cellules indifférenciées en division à l’apex."),
      q("Le gamétophyte des angiospermes est :", ["Dominant et autonome", "Très réduit", "Un arbre entier", "Absent"], 1, "Pollen et sac embryonnaire."),
      q("Le cacao est :", ["Une gymnosperme", "Une angiosperme", "Une bryophyte", "Un champignon"], 1, "Theobroma cacao, dicotylédone tropicale."),
    ],
    exercices: [
      {
        prompt: "Comparez sporophyte et gamétophyte chez une fougère et chez un haricot.",
        solution:
          "Fougère : sporophyte dominant (frondes), gamétophyte = prothalle indépendant. Haricot : sporophyte = plante entière, gamétophytes microscopiques dépendants.",
      },
    ],
    exams: [
      {
        title: "Épreuve de botanique générale",
        year: 2024,
        content: "1. Méristèmes (6).\n2. Double fécondation (8).\n3. Organes végétatifs (6).",
        correction: "1. Apicaux, axillaires, cambiums. 2. Deux gamètes mâles, oosphère, noyaux polaires, albumen. 3. Racine, tige, feuille — fonctions.",
      },
    ],
  },
  {
    filiereSlug: "bov",
    niveau: 1,
    semestre: 1,
    slug: "chimie-orga-intro",
    title: "Chimie organique introductive",
    code: "CHM113",
    hours: 35,
    description: "Carbone, groupes fonctionnels, biomolécules vues du chimiste.",
    content: `## Le carbone
Tétravalence, chaînes, cycles, isomérie (constitution, géométrie, optique). Le vivant est chiral : acides aminés L, sucres D.

## Groupes
Alcool, aldéhyde, cétone, acide carboxylique, amine, amide, ester, thiol. Reconnaître pour lire une fiche de métabolite.

## Biomolécules
Oses, acides gras, acides aminés, nucléotides. Liaison glycosidique, ester, peptidique, phosphodiester.

## Eau et hydrophobicité
Les lipides s’auto-organisent. Les protéines plient en cachant les chaînes hydrophobes. Base de toute biochimie végétale.`,
    resume: `Carbone tétravalent, isomérie, chiralité. 8 groupes fonctionnels à reconnaître. 4 familles de biomolécules et leurs liaisons.`,
    qcm: [
      q("Une liaison peptidique unit :", ["Deux oses", "Deux acides aminés", "Un acide gras et le glycérol", "Deux bases azotées"], 1, "Amide entre COOH et NH2."),
      q("Les acides aminés protéinogènes naturels sont principalement :", ["D", "L", "Racémiques obligatoires", "Sans carbone asymétrique"], 1, "Série L (sauf glycine, achirale)."),
      q("Un ester d’acide gras et de glycérol entre dans :", ["L’ADN", "Un triglycéride", "Un polysaccharide", "Un polypeptide"], 1, "Lipide de réserve."),
      q("La liaison phosphodiester se trouve dans :", ["L’amidon", "Les acides nucléiques", "Le collagène", "La cellulose uniquement"], 1, "Squelette sucre-phosphate de l’ADN/ARN."),
    ],
    exercices: [
      {
        prompt: "Classez glucose, glycine, palmitate, AMP dans les 4 familles, et nommez la liaison homopolymère de chacune quand elle existe.",
        solution:
          "Glucose : ose, glycosidique (amidon/cellulose). Glycine : AA, peptidique. Palmitate : acide gras, ester (triglycérides, phospholipides). AMP : nucléotide, phosphodiester.",
      },
    ],
  },
  {
    filiereSlug: "bov",
    niveau: 1,
    semestre: 2,
    slug: "anatomie-vegetale",
    title: "Anatomie végétale",
    code: "VEG121",
    hours: 45,
    description: "Tissus végétaux, racines, tiges, feuilles — coupes et lecture.",
    content: `## Tissus
Méristématiques, de protection (épiderme, rhytidome), parenchymes, soutien (collenchyme, sclérenchyme), conducteurs (xylème, phloème).

## Racine
Poils absorbants, endoderme à cadre de Caspary (contrôle de l’apoplaste), stèle. Racines d’orchidées, de palétuviers (pneumatophores) : variantes écologiques.

## Tige
Faisceaux cribro-vasculaires. Mono vs dicotylédones (faisceaux épars vs cercle + cambium).

## Feuille
Cuticule, stomates, mésophylle palissadique et lacuneux, nervures. Adaptations xérophytes / hygrophytes, utiles en climat à saison sèche.`,
    resume: `Xylème (eau, lignine) / phloème (sève élaborée). Endoderme. Coupes racine-tige-feuille : savoir les reconnaître. Stomates = régulation gazeuse.`,
    qcm: [
      q("Le cadre de Caspary se trouve :", ["Dans le xylème secondaire", "Dans l’endoderme racinaire", "Sur la cuticule foliaire", "Dans le pollen"], 1, "Subérine : force le passage transcellulaire."),
      q("Le xylème transporte principalement :", ["La sève élaborée", "L’eau et les ions (sève brute)", "Les grains de pollen", "Les hormones uniquement"], 1, "Conduction unidirectionnelle racine → feuilles."),
      q("Chez les dicotylédones, les faisceaux de la tige sont :", ["Épars", "En cercle, avec cambium", "Absents", "Uniquement du phloème"], 1, "Organisation permettant la croissance secondaire."),
      q("Les stomates contrôlent :", ["La méiose", "Les échanges gazeux et la transpiration", "La lignification du bois", "La germination seule"], 1, "Ouverture liée à la turgescence des cellules de garde."),
    ],
    exercices: [
      {
        prompt: "Sur une coupe transversale de feuille dorsiventrale, légendez 6 tissus et donnez une fonction à chacun.",
        solution:
          "Cuticule (protection), épiderme (barrière), palissade (photosynthèse), lacuneux (circulation CO2), stomate (échanges), nervure xylème/phloème (conduction).",
      },
    ],
  },
  {
    filiereSlug: "bov",
    niveau: 1,
    semestre: 2,
    slug: "physio-veg-1",
    title: "Physiologie végétale I",
    code: "VEG122",
    hours: 40,
    description: "Eau, nutrition minérale, transpiration.",
    content: `## Potentiel hydrique
Ψ = Ψs + Ψp (+ Ψg). L’eau va vers le Ψ le plus bas. Absorption racinaire, continuum sol-plante-atmosphère.

## Transpiration
Force principale de l’ascension de la sève brute (cohésion-tension). Stomates, facteurs (lumière, VPD, CO2, ABA).

## Nutrition minérale
Macroéléments (N, P, K, Ca, Mg, S) et oligo. Carences typiques : N (chlorose des vieilles feuilles), Fe (chlorose des jeunes, sols calcaires).

## Sève élaborée
Théorie de Münch : pression osmotique aux sources (feuilles) pousse vers les puits (racines, fruits, méristèmes).`,
    resume: `Potentiel hydrique. Cohésion-tension. NPK et carences. Münch pour le phloème. ABA ferme les stomates en stress hydrique.`,
    qcm: [
      q("L’eau se déplace vers :", ["Le Ψ le plus élevé", "Le Ψ le plus bas", "Toujours le xylème", "Le chloroplaste uniquement"], 1, "Descente du potentiel chimique de l’eau."),
      q("L’ABA en stress hydrique :", ["Ouvre les stomates", "Ferme les stomates", "Détruit le xylème", "Fixe le N2"], 1, "Hormone du stress, baisse de turgescence des cellules de garde."),
      q("Une chlorose des feuilles âgées évoque souvent une carence en :", ["Fer", "Azote (élément mobile)", "Calcium (peu mobile)", "Bore"], 1, "Les mobiles sont remobilisés depuis les vieilles feuilles."),
      q("La théorie de Münch décrit :", ["La photosynthèse C4", "Le flux de sève élaborée", "La plasmolyse", "La nodulation"], 1, "Pression de turgescence source → puits."),
    ],
    exercices: [
      {
        prompt: "Pourquoi un palmier de 20 m n’a-t-il pas besoin d’un « cœur pompe » pour monter l’eau ?",
        solution:
          "La transpiration crée une tension continue dans les colonnes d’eau cohésives du xylème (Dixon). La pompe est atmosphérique + cohésion, pas un organe contractile.",
      },
    ],
  },
  {
    filiereSlug: "bov",
    niveau: 1,
    semestre: 2,
    slug: "ecologie-tropicale",
    title: "Écologie des milieux tropicaux",
    code: "ECO121",
    hours: 35,
    description: "Forêt, mangrove, savane : concepts d’écologie à partir du Cameroun.",
    content: `## Niveaux
Individu, population, communauté, écosystème. Niche vs habitat. Compétition, prédation, mutualisme (mycorhizes, nodosités).

## Forêt dense
Strates, ombre, sols souvent pauvres (nutriments dans la biomasse). Déforestation et fragmentation autour de Douala.

## Mangrove du Wouri
Palétuviers, marées, nurseries halieutiques, filtres. Menaces : remblais, pollution pétrolière, bois de chauffe.

## Productivité
Photosynthèse nette, pyramides. Climat équatorial : saisonnalité plus hydrique que thermique.`,
    resume: `Niche, interactions. Forêt : nutriments dans la biomasse. Mangrove = écosystème-clé du littoral. Saison des pluies = facteur structurant.`,
    qcm: [
      q("Dans beaucoup de forêts tropicales, les nutriments sont surtout :", ["Dans un humus très épais comme en taïga", "Stockés dans la biomasse vivante", "Absents", "Dans le sous-sol profond inaccessible"], 1, "Sols lixiviés, recyclage rapide."),
      q("La mangrove est notamment :", ["Un désert salé stérile", "Une nurserie pour poissons et un trait de côte", "Une forêt de conifères", "Un récif corallien"], 1, "Habitat de marée, rôles halieutique et protection."),
      q("Une niche écologique désigne :", ["Le GPS de l’espèce", "Le rôle et les conditions d’existence d’une espèce", "Uniquement le régime alimentaire", "La couleur du pelage"], 1, "Hutchinson : hypervolume de conditions et ressources."),
      q("Les mycorhizes sont :", ["Des parasites toujours mortels", "Une symbiose champignon-racine", "Des insectes xylophages", "Des algues libres"], 1, "Échange C contre P et eau."),
    ],
    exercices: [
      {
        prompt: "Citez trois services écosystémiques de la mangrove du Wouri et une pression anthropique pour chacun.",
        solution:
          "Nurserie (surpêche, filets) ; protection côtière (remblais) ; filtration/carbone (pollution, coupe). Réponse argumentée acceptée.",
      },
    ],
  },
  {
    filiereSlug: "bov",
    niveau: 2,
    semestre: 1,
    slug: "systematique-angiospermes",
    title: "Systématique des angiospermes",
    code: "VEG211",
    hours: 45,
    description: "Fleurs, familles majeures, clades APG, flore utile du Cameroun.",
    content: `## Fleur
Verticilles : calice, corolle, androcée, gynécée. Ovaire supère/infère, placentation. Formules et diagrammes floraux.

## APG
Classification phylogénétique (APG IV) : ANA, magnoliidées, monocotylédones, eudicotylédones. On abandonne « dicotylédones » comme clade.

## Familles à connaître
Poaceae, Fabaceae, Asteraceae, Rubiaceae, Euphorbiaceae, Malvaceae, Arecaceae. Exemples locaux : mil, arachide, caféier, manioc, cacao, palmier à huile.

## Herbier
Collecte, notes de terrain, séchage. Un nom scientifique (binomial, auteur) n’est pas un luxe : c’est la clé des fiches de révision.`,
    resume: `Formule florale. APG, plus de « dicot » clade. 7 familles et un exemple camerounais chacune. Binom latin.`,
    qcm: [
      q("Les Fabaceae se reconnaissent souvent à :", ["Une ligule et des épillets", "Une corolle papilionacée et des gousses", "Un capitule", "Un spadice"], 1, "Fleur papilionacée, fruit = légume (gousse), nodosités fréquentes."),
      q("APG est :", ["Un colorant", "Une classification phylogénétique des angiospermes", "Un méristème", "Un pesticide"], 1, "Angiosperm Phylogeny Group."),
      q("Le caféier appartient aux :", ["Poaceae", "Rubiaceae", "Arecaceae", "Pinaceae"], 1, "Coffea, Rubiaceae."),
      q("Un ovaire infère est :", ["Au-dessus des autres pièces", "Sous l’insertion des pièces florales, souvent infère dans un fruit inférieur", "Toujours absent", "Propre aux mousses"], 1, "Les pièces s’insèrent au-dessus de l’ovaire."),
    ],
    exercices: [
      {
        prompt: "Écrivez une formule florale simplifiée du haricot et identifiez la famille.",
        solution: "Fabaceae, papilionacée : calice 5, corolle 5 (étendard, ailes, carène), 10 étamines (souvent 9+1), gynécée 1 carpelle. Fruit : gousse.",
      },
    ],
  },
  {
    filiereSlug: "bov",
    niveau: 2,
    semestre: 1,
    slug: "genetique-vegetale",
    title: "Génétique végétale",
    code: "VEG212",
    hours: 40,
    description: "Hérédité chez les plantes, polyploïdie, sélection.",
    content: `## Particularités
Autofécondation fréquente, allopolyploïdie (blé), stérilités, gènes cytoplasmiques (mitochondries, chloroplastes, hérédité maternelle).

## Amélioration
Sélection massale, hybrides F1, conservation des ressources. Au Cameroun : cacao, café, plantain, igname — enjeux de résistance et de rendement.

## Biotechnologies, aperçu
Culture in vitro, marqueurs moléculaires. Détail en L2S2 biotechnologies.

## Populations
Flux de gènes, introgression, risques pour les variétés locales.`,
    resume: `Plantes : polyploïdie, autofécondation, ADN chloroplastique maternel. Hybrides F1. Ressources génétiques locales à connaître.`,
    qcm: [
      q("L’ADN chloroplastique s’hérite généralement :", ["De façon paternelle exclusive", "De façon maternelle", "Selon Mendel 3:1 toujours", "Uniquement par les étamines"], 1, "Le cytoplasme du zygote vient surtout de l’oosphère."),
      q("Un hybride F1 commercial vise surtout :", ["La ségrégation maximale dès F1", "La vigueur hybride (hétérosis)", "La stérilité des parents", "À éliminer toute diversité"], 1, "Hétérosis : performance supérieure à celle des parents."),
      q("La polyploïdie est :", ["Impossible chez les plantes", "Fréquente et source de spéciation végétale", "Un synonyme de mutation ponctuelle", "Propre aux bactéries"], 1, "Blé hexaploïde, etc."),
      q("L’autofécondation tend à :", ["Maximiser l’hétérozygotie", "Augmenter l’homozygotie", "Créer du MHC", "Supprimer la méiose"], 1, "En unissant des gamètes apparentés."),
    ],
    exercices: [
      {
        prompt: "Pourquoi conserver des variétés locales de cacao au Cameroun ?",
        solution:
          "Réservoir d’allèles (arôme, résistance Phytophthora, adaptation). L’érosion génétique des clones commerciaux est un risque. Banques de gènes + paysans-conservateurs.",
      },
    ],
  },
  {
    filiereSlug: "bov",
    niveau: 2,
    semestre: 1,
    slug: "physio-veg-2",
    title: "Physiologie végétale II",
    code: "VEG213",
    hours: 45,
    description: "Photosynthèse C3/C4/CAM, hormones, floraison.",
    content: `## Photosynthèse
Phase claire (eau → O2, NADPH, ATP) et Calvin (RuBisCO, C3). Photorespiration. C4 (PEP carboxylase, anatomie Kranz) : mil, maïs, canne. CAM : succulentes, ouverture nocturne des stomates.

## Hormones
Auxine (phototropisme, dominance apicale), cytokinines, gibbérellines, éthylène, ABA. Équilibres plus que molécules isolées.

## Floraison
Photopériode, vernalisation, statut carboné. Phytochrome.

## Tropismes
Photo, gravi, thigmo. Statolithes dans la coiffe.`,
    resume: `C3 vs C4 vs CAM. RuBisCO et photorespiration. 5 hormones classiques. Phytochrome et photopériode. C4 adapté aux chaudes fortes lumières.`,
    qcm: [
      q("La photorespiration est liée à l’activité oxygénase de :", ["La PEP carboxylase", "La RuBisCO", "L’ATP synthase", "La nitrate réductase"], 1, "RuBisCO confond O2 et CO2, surtout à haute T° et bas CO2 interne."),
      q("Une plante C4 typique :", ["Le riz", "Le maïs", "Le blé tendre", "La tomate"], 1, "Maïs, canne, mil : anatomie Kranz."),
      q("L’auxine est impliquée dans :", ["La fermeture stomatique sèche uniquement", "Le phototropisme et la dominance apicale", "La lignification exclusive", "La méiose"], 1, "Transport polarisé, élongation cellulaire différentielle."),
      q("Le CAM ouvre surtout les stomates :", ["À midi", "La nuit", "Jamais", "Sous l’eau"], 1, "Fixation nocturne du CO2 en malate, Calvin le jour."),
    ],
    exercices: [
      {
        prompt: "Pourquoi le mil (C4) est-il plus performant que beaucoup de C3 en savane chaude ?",
        solution:
          "PEP carboxylase concentre le CO2, limite la photorespiration à haute température et forte lumière, meilleure efficience de l’eau. Adapté aux climats chauds.",
      },
    ],
    exams: [
      {
        title: "Épreuve de physiologie végétale",
        year: 2025,
        content: "1. Comparez C3 et C4 (10).\n2. Rôle de l’éthylène (5).\n3. Phytochrome (5).",
        correction: "1. Premier carboxylase, anatomie, habitats, photorespiration. 2. Maturation, abscission, stress. 3. Pr/Pfr, photopériode.",
      },
    ],
  },
  {
    filiereSlug: "bov",
    niveau: 2,
    semestre: 2,
    slug: "phytopathologie",
    title: "Phytopathologie",
    code: "VEG221",
    hours: 40,
    description: "Maladies des plantes : champignons, bactéries, virus, lutte.",
    content: `## Triangle de la maladie
Hôte sensible × pathogène virulent × environnement favorable. On agit sur l’un des trois.

## Agents
Champignons (mildious, rouilles, pourritures), bactéries (flétrissements), virus (mosaïques, souvent vecteurs pucerons), nématodes, plantes parasites (Striga sur céréales).

## Défense
Barrières, métabolites secondaires, hypersensibilité, gènes R. Induction (éliciteurs).

## Lutte
Prophylaxie, variétés résistantes, lutte biologique, pesticides en dernier recours. Cacao et Phytophthora, manioc et mosaïque : dossiers locaux.`,
    resume: `Triangle hôte-pathogène-milieu. Reconnaître un symptôme n’est pas un diagnostic. Gènes R, lutte intégrée. Deux cas : cacao, manioc.`,
    qcm: [
      q("Le triangle de la maladie comprend :", ["Lumière, gravité, auxine", "Hôte, pathogène, environnement", "Xylème, phloème, cambium", "C3, C4, CAM"], 1, "Les trois doivent coïncider."),
      q("Striga est :", ["Un virus du manioc", "Une plante parasite de céréales", "Un coléoptère du cacao", "Un oligoélément"], 1, "Striga hermonthica, fléau des mils/maïs."),
      q("La mosaïque du manioc est due principalement à :", ["Un champignon du sol", "Un virus transmis souvent par aleurodes", "Une carence en fer uniquement", "L’éthylène"], 1, "CMD, Begomovirus, Bemisia."),
      q("Un gène R végétal :", ["Code une hormone de floraison", "Reconnaît souvent un effecteur pathogène (gène pour gène)", "Est un pesticide", "Empêche la photosynthèse"], 1, "Modèle Flor, hypersensibilité."),
    ],
    exercices: [
      {
        prompt: "Proposez un itinéraire de lutte intégrée contre la pourriture brune du cacaoyer.",
        solution:
          "Assainissement (gousses malades), ombrage et aération, variétés moins sensibles, récolte sanitaire, fongicides raisonnés, formation des planteurs. Pas un seul levier.",
      },
    ],
  },
  {
    filiereSlug: "bov",
    niveau: 2,
    semestre: 2,
    slug: "ecologie-vegetale",
    title: "Écologie végétale",
    code: "VEG222",
    hours: 40,
    description: "Populations végétales, successions, phytosociologie de terrain.",
    content: `## Population
Tables de survie, banques de graines, stratégies r/K (ou CSR de Grime : compétitive, stress-tolérante, rudérale).

## Communautés
Successions primaires/secondaires, climax discutable en forêt tropicale exploitée. Espèces indicatrices.

## Interactions
Compétition lumineuse, allélopathie, facilitation (ombre des pionnières).

## Méthodes
Quadrats, transects, indices de diversité (Shannon). Un relevé propre vaut mieux qu’un discours.`,
    resume: `CSR Grime. Succession. Mesurer (quadrat, Shannon) avant d’interpréter. Facilitation aussi importante que compétition en milieu dur.`,
    qcm: [
      q("Une espèce rudérale selon Grime :", ["Tolère un stress chronique intense", "Colonise les milieux perturbés, cycle court", "Domine par la compétition en milieu riche stable", "Est toujours un arbre émergent"], 1, "R : perturbation, croissance rapide, semences."),
      q("Shannon mesure :", ["La biomasse racinaire", "La diversité (richesse + équitabilité)", "Le pH du sol uniquement", "La photorespiration"], 1, "Indice d’entropie des abondances."),
      q("Une succession secondaire part :", ["D’un substrat neuf sans sol", "D’un sol déjà présent après perturbation", "Toujours de la mangrove", "D’une culture pure éternelle"], 1, "Ex. : jachère après champ."),
      q("Une banque de graines est :", ["Un herbier", "Un stock de diaspores viables dans le sol", "Un cambium", "Une mycorhize"], 1, "Réservoir pour la régénération."),
    ],
    exercices: [
      {
        prompt: "Vous relevez 4 espèces d’abondances égales. Que dire de Shannon par rapport à un peuplement d’une seule espèce dominante ?",
        solution:
          "Diversité maximale pour S=4 (équitabilité 1) : H = ln 4 ≈ 1,39 nats. Un peuplement monospécifique : H = 0. La richesse S ne suffit pas : l’équitabilité compte.",
      },
    ],
  },
  {
    filiereSlug: "bov",
    niveau: 2,
    semestre: 2,
    slug: "biotech-vegetales",
    title: "Biotechnologies végétales",
    code: "VEG223",
    hours: 40,
    description: "Culture in vitro, transformation, enjeux éthiques et agronomiques.",
    content: `## In vitro
Totipotence, milieu de Murashige et Skoog, ratio auxine/cytokinine (racines vs tiges). Micropropagation, assainissement viral, haploïdes.

## Transformation
Agrobacterium, biolistique, CRISPR en perspective. OGM : promesse (résistance, nutriments) et débats (dépendance semencière, flux de gènes).

## Applications locales
Manioc, bananier plantain, cacao : multiplication saine, résistance. Ce n’est pas une baguette magique : l’agronomie reste première.

## Éthique
Biosécurité, consentement des communautés, souveraineté alimentaire.`,
    resume: `Totipotence + hormones = organogenèse. Micropropagation. Agrobacterium. OGM : technique + société. Assainissement viral très concret pour le plantain.`,
    qcm: [
      q("Un ratio cytokinine/auxine élevé favorise plutôt :", ["Les racines", "Les tiges/bourgeons", "La lignine", "La photorespiration"], 1, "Skoog et Miller : équilibre hormonal."),
      q("Agrobacterium tumefaciens est utilisé pour :", ["La photosynthèse C4", "Transférer de l’ADN-T dans des plantes", "La nodulation des Poaceae", "Tuer les virus"], 1, "Outil de transformation historique."),
      q("La totipotence végétale désigne :", ["L’incapacité à se différencier", "La capacité d’une cellule à régénérer un organisme", "La polyploïdie", "La cuticule"], 1, "Base de la culture in vitro."),
      q("La micropropagation sert surtout à :", ["Créer de la diversité maximale", "Multiplier à l’identique un génotype (souvent assaini)", "Remplacer la photosynthèse", "Fixer le N2"], 1, "Clones, parfois sains (apex méristématique)."),
    ],
    exercices: [
      {
        prompt: "Quels arguments pour et contre un plantain transgénique résistant à un virus, dans un contexte de petite agriculture ?",
        solution:
          "Pour : sécurité alimentaire, moins de pesticides, plants sains. Contre : coût, accès aux rejets, propriété intellectuelle, acceptabilité, besoin d’accompagnement agronomique. Une réponse nuancée est exigée.",
      },
    ],
  },
  {
    filiereSlug: "bch",
    niveau: 1,
    semestre: 1,
    slug: "chimie-generale-bch",
    title: "Chimie générale",
    code: "CHM101",
    hours: 45,
    description: "Stœchiométrie, thermochimie, équilibres, rédox — socle du biochimiste.",
    content: `## Quantité de matière
Mole, concentrations, stœchiométrie, rendement. Sans ça, aucune cinétique enzymatique ne tient.

## Thermochimie
ΔU, ΔH, ΔS, ΔG. Spontané si ΔG < 0. Les cellules vivent hors équilibre en couplant les réactions.

## Équilibres et acides-bases
K, Le Chatelier, pKa, tampons (Henderson-Hasselbalch). Le sang à 7,4 n’est pas un miracle : c’est un tampon.

## Rédox
Oxydation = perte d’e−. NAD+/NADH, couple de l’eau. Bases de la chaîne respiratoire.`,
    resume: `Mole et concentrations. ΔG. pKa et Henderson-Hasselbalch. Rédox NAD+. Le Chatelier.`,
    qcm: [
      q("Henderson-Hasselbalch relie :", ["ΔG et K", "pH, pKa et le rapport base/acide", "Pression et volume", "Km et Vmax"], 1, "pH = pKa + log([A−]/[AH])."),
      q("Une réaction est spontanée (P,T const.) si :", ["ΔG > 0", "ΔG < 0", "ΔH > 0 toujours", "K = 0"], 1, "Critère d’évolution."),
      q("NADH est la forme :", ["Oxydée du NAD", "Réduite du NAD", "Phosphorylée de l’eau", "Un acide aminé"], 1, "Elle porte un hydrure, à réoxyder dans la chaîne."),
      q("Le Chatelier : si on retire un produit :", ["L’équilibre ne bouge pas", "L’équilibre se déplace vers les produits", "K change forcément", "ΔG° s’annule"], 1, "Le système atténue la perturbation."),
    ],
    exercices: [
      {
        prompt: "Pour un acide de pKa 7,4, quel est le rapport [A−]/[AH] à pH 7,4 ?",
        solution: "log([A−]/[AH]) = 0 ⇒ rapport = 1. Tampon maximal.",
      },
    ],
  },
  {
    filiereSlug: "bch",
    niveau: 1,
    semestre: 1,
    slug: "biochimie-structurale",
    title: "Biochimie structurale",
    code: "BCH111",
    hours: 50,
    description: "Protéines, glucides, lipides, acides nucléiques : structures.",
    content: `## Acides aminés et protéines
20 AA, liaisons peptidiques, structures I–IV. Ponts S-S, interactions faibles. Dénaturation (chaleur, pH, urée) sans casser forcément la primaire.

## Glucides
Oses, anomères, osides. Amidon, glycogène, cellulose : même glucose, liaisons différentes (α1-4 / β1-4).

## Lipides
Acides gras saturés/insaturés, phospholipides, cholestérol, membranes fluides.

## Acides nucléiques
Brin, appariement, superenroulement. ARN messager, ribosomique, de transfert.`,
    resume: `Quatre niveaux protéiques. Glucose α vs β change tout (amidon/cellulose). Membranes = phospholipides fluides. ADN double hélice, ARN simple brin souvent.`,
    qcm: [
      q("La structure primaire d’une protéine est :", ["L’hélice α", "La séquence des acides aminés", "L’assemblage de sous-unités", "Un pont S-S seul"], 1, "Covalent, liaison peptidique."),
      q("La cellulose est un polymère de glucose en :", ["α1-4", "β1-4", "α1-6 seulement", "Liaison peptidique"], 1, "Nous ne la digérons pas (pas de cellulase)."),
      q("Un acide gras insaturé cis :", ["Augmente en général la fluidité membranaire", "Est toujours solide à 37 °C", "Est un ose", "Casse l’ADN"], 0, "Coude cis, empilement moindre."),
      q("Un pont disulfure implique :", ["Deux cystéines", "Deux glycines", "Deux lysines", "Le glucose"], 0, "Oxydation des thiols, souvent protéines extra-cellulaires."),
    ],
    exercices: [
      {
        prompt: "Pourquoi un blanc d’œuf chauffé durcit-il, et que devient la structure primaire ?",
        solution:
          "Dénaturation thermique : perte des structures II/III, agrégation hydrophobe (coagulum). Les liaisons peptidiques (I) restent, sauf hydrolyse extrême.",
      },
    ],
    exams: [
      {
        title: "Épreuve de biochimie structurale",
        year: 2024,
        content: "1. Niveaux de structure protéique (8).\n2. Comparez amidon et cellulose (6).\n3. Composition d’une membrane (6).",
        correction: "1. I à IV, liaisons. 2. α vs β, ramifications, rôle. 3. Bicouche, protéines, cholestérol, fluidité.",
      },
    ],
  },
  {
    filiereSlug: "bch",
    niveau: 1,
    semestre: 1,
    slug: "biologie-cellulaire-bch",
    title: "Biologie cellulaire",
    code: "BIO101",
    hours: 40,
    description: "Compartiments, trafic, cytosquelette — pour biochimistes.",
    content: `## Compartimentation
La cellule eucaryote sépare les milieux (pH lysosomal, gradient mitochondrial). Cela autorise des ΔG locaux.

## Trafic
Signal peptidique, vésicules COPI/COPII/clathrine. Adressage lysosomal (mannose-6-phosphate).

## Cytosquelette
Actine, microtubules (dynéine, kinésine), filaments intermédiaires. Mitose : fuseau.

## Méthodes
Centrifugation différentielle (fractionner mitochondries, microsomes), SDS-PAGE, immunofluorescence. Un biochimiste doit savoir d’où vient sa fraction.`,
    resume: `Compartiments = chimie localisée. Trafic vésiculaire. Trois cytosquelettes. Fractionnement cellulaire : outil de base.`,
    qcm: [
      q("Le mannose-6-phosphate adresse des hydrolases :", ["Au noyau", "Aux lysosomes", "Aux peroxysomes uniquement", "À la matrice mitochondriale"], 1, "Marqueur d’adressage golgien vers le lysosome."),
      q("Une centrifugation différentielle sépare surtout selon :", ["La couleur", "La taille/densité (sédimentation)", "Le pI uniquement", "Le code génétique"], 1, "Noyaux d’abord, puis mito, microsomes, cytosol."),
      q("Les microtubules sont polarisés et servent de rails pour :", ["Kinésines et dynéines", "RuBisCO", "L’hémoglobine", "Les stomates"], 0, "Moteurs ATPases."),
      q("Le pH lysosomal est :", ["Alcalin (~8)", "Acide (~5)", "Neutre strict", "Identique au cytosol"], 1, "Hydrolases acides."),
    ],
    exercices: [
      {
        prompt: "Vous voulez enrichir des mitochondries de foie. Esquissez le protocole de fractionnement.",
        solution:
          "Homogénéiser à froid en isotonique → culot noyaux (basse vitesse) → surnageant à vitesse moyenne : culot mitochondrial → contrôle (cytochrome c oxydase), pas de LDH (cytosol).",
      },
    ],
  },
  {
    filiereSlug: "bch",
    niveau: 1,
    semestre: 2,
    slug: "enzymologie",
    title: "Enzymologie",
    code: "BCH121",
    hours: 50,
    description: "Catalyse, Michaelis-Menten, inhibitions, régulation.",
    content: `## Catalyse
L’enzyme abaisse l’énergie d’activation, pas le ΔG de réaction. Spécificité, site actif, cofacteurs (ions, coenzymes).

## Michaelis-Menten
v = Vmax [S] / (Km + [S]). Km ≈ affinité inverse (avec prudence). Lineweaver-Burk (1/v vs 1/[S]).

## Inhibitions
Compétitive (↑Km app, Vmax identique), non compétitive (↓Vmax), incompétitive. Irréversible (poison).

## Régulation
Allostérie (sigmoidale), phosphorylation, zymogènes. Les enzymes clés des voies (PFK-1) ne sont pas michaeliennes simples.`,
    resume: `Catalyse ≠ changer ΔG. Km, Vmax. Compétitif vs non compétitif sur les graphes. Allostérie = sigmoidale. Cofacteurs.`,
    qcm: [
      q("Km est numériquement :", ["La vitesse maximale", "[S] à v = Vmax/2", "Toujours égale à Kd", "Un pH"], 1, "Définition opérationnelle MM."),
      q("Un inhibiteur compétitif :", ["Baisse Vmax", "Augmente Km apparent, Vmax inchangée", "Détruit le substrat", "Est toujours irréversible"], 1, "Même intercept 1/Vmax en LB."),
      q("Une courbe v = f([S]) sigmoïde suggère :", ["Une enzyme allostérique", "Une inhibition incompétitive pure", "L’absence d’enzyme", "Un pH 0"], 0, "Coopérativité, pas MM hyperbolique."),
      q("L’enzyme ne modifie pas :", ["L’Ea", "La constante d’équilibre K (donc ΔG°)", "La vitesse initiale", "Le chemin réactionnel"], 1, "Catalyse cinétique, pas thermodynamique d’équilibre."),
    ],
    exercices: [
      {
        prompt: "À [S] = Km, que vaut v/Vmax ? Que se passe-t-il si on double [S] ?",
        solution: "v = Vmax/2. Si [S] = 2 Km, v = 2/3 Vmax — pas un doublement. Saturation non linéaire.",
      },
    ],
    exams: [
      {
        title: "Épreuve d’enzymologie",
        year: 2023,
        content: "1. Démontrez v = Vmax/2 quand [S]=Km (4).\n2. Inhibitions, graphes LB (10).\n3. Allostérie vs MM (6).",
        correction: "1. Substitution directe. 2. Compétitif/non compétitif, Km Vmax. 3. Sigmoïde, effecteurs, exemples PFK.",
      },
    ],
  },
  {
    filiereSlug: "bch",
    niveau: 1,
    semestre: 2,
    slug: "metabolisme-glucides",
    title: "Métabolisme des glucides",
    code: "BCH122",
    hours: 45,
    description: "Glycolyse, cycle de Krebs, rendement énergétique.",
    content: `## Glycolyse
Glucose → 2 pyruvate, 2 ATP nets, 2 NADH, dans le cytosol. Étapes irréversibles : hexokinase, PFK-1, pyruvate kinase.

## Destins du pyruvate
Aérobie : mitochondrie, acétyl-CoA. Anaérobie : lactate (muscle, globule rouge). Levure : éthanol (hors programme humain mais pédagogique).

## Krebs
Matrice, 3 NADH, 1 FADH2, 1 GTP par acétyl. Amphibolique (intermédiaires précurseurs).

## Rendement
L’oxydation complète du glucose vise ~30 ATP selon le navette. Ce chiffre a de l’histoire : l’important est la logique des phosphorylations.`,
    resume: `Glycolyse cytosolique, 2 ATP nets. Pyruvate : aérobie ou lactate. Krebs mitochondrial. NADH/FADH2 vers la chaîne. Étapes irréversibles = régulation.`,
    qcm: [
      q("La glycolyse se déroule :", ["Dans la matrice", "Dans le cytosol", "Dans le thylakoïde", "Dans le noyau"], 1, "10 enzymes cytosoliques."),
      q("Le bilan net de la glycolyse (glucose → 2 pyruvate) :", ["4 ATP + 2 NADH", "2 ATP + 2 NADH", "32 ATP", "2 GTP seulement"], 1, "4 ATP formés, 2 consommés."),
      q("PFK-1 est inhibée par :", ["AMP", "ATP (et citrate, chez beaucoup d’organismes)", "NAD+", "L’oxygène moléculaire directement"], 1, "Signal de charge énergétique haute."),
      q("Le cycle de Krebs produit directement :", ["De l’O2", "Des équivalents réduits NADH/FADH2 et du GTP", "Du glycogène", "De l’urée uniquement"], 1, "La phosphorylation oxydative vient après."),
    ],
    exercices: [
      {
        prompt: "Pourquoi le globule rouge produit-il du lactate même en présence d’O2 ?",
        solution:
          "Pas de mitochondries : seule la glycolyse. Le lactate régénère le NAD+ (lactate déshydrogénase) pour continuer à phosphoryler le glucose.",
      },
    ],
  },
  {
    filiereSlug: "bch",
    niveau: 1,
    semestre: 2,
    slug: "techniques-labo",
    title: "Techniques de laboratoire",
    code: "BCH123",
    hours: 35,
    description: "pH-métrie, spectrophotométrie, chromatographie, électrophorèse, sécurité.",
    content: `## Sécurité
Pictogrammes, EPI, gestion des déchets biologiques et chimiques. Un accident de paillasse n’est pas une anecdote.

## pH et solutions
Balances, fioles, pipettes (précision), tampons. Erreurs relatives.

## Spectro
Beer-Lambert : A = ε l c. Dosage de protéines (Bradford), NADH à 340 nm.

## Séparations
Chromatographie (papier, CCM, échange d’ions, gel filtration). SDS-PAGE. Centrifugation.

## Cahier
Daté, lisible, brut. C’est une pièce scientifique, pas un brouillon jetable.`,
    resume: `Sécurité d’abord. Beer-Lambert. Pipettes : technique. SDS-PAGE et CCM. Cahier de labo exemplaire.`,
    qcm: [
      q("Beer-Lambert relie l’absorbance :", ["Au pH seulement", "À la concentration (si ε et l connus, domaine linéaire)", "À Km", "Au ΔG"], 1, "A = εlc, solutions diluées, monochromatiques."),
      q("Le NADH s’observe classiquement à :", ["260 nm seulement", "340 nm", "700 nm", "IR lointain"], 1, "Bande caractéristique de la forme réduite."),
      q("Le SDS dans le PAGE :", ["Garde la charge native", "Dénature et charge négativement les protéines au prorata de la masse", "Colorie l’ADN", "Mesure le pH"], 1, "Séparation surtout selon M."),
      q("Une pipette à volume variable se tient :", ["Inclinée à 90° en vidange toujours", "Verticale, pointe adaptée, 1er cran / 2e cran selon le geste", "Comme un stylo sans pointe", "Chauffée"], 1, "Technique standard, pointe immergée juste assez."),
    ],
    exercices: [
      {
        prompt: "A = 0,60 ; ε = 6220 L·mol⁻¹·cm⁻¹ ; l = 1 cm. Quelle est [NADH] ?",
        solution: "c = A/(εl) = 0,60/6220 ≈ 9,65 × 10⁻⁵ mol·L⁻¹.",
      },
    ],
  },
  {
    filiereSlug: "bch",
    niveau: 2,
    semestre: 1,
    slug: "metabolisme-intermediaire",
    title: "Métabolisme intermédiaire",
    code: "BCH211",
    hours: 50,
    description: "Lipides, azote, intégration des voies, jeûne/repas.",
    content: `## Lipides
β-oxydation, corps cétoniques, synthèse des acides gras (cytosol, malonyl-CoA). Le foie orchestre.

## Azote
Transamination, cycle de l’urée (coût ATP, mitochondrie + cytosol). Devenir du squelette carboné.

## Intégration
Repas : insuline, glycogénogenèse, lipogenèse. Jeûne : glucagon, glycogénolyse, néoglucogenèse, cétogenèse. Recroiser la physiologie.

## Régulation croisée
Malonyl-CoA inhibe la CPT-1 : on ne fait pas β-oxydation et synthèse en même temps.`,
    resume: `β-oxydation vs synthèse (malonyl, CPT-1). Urée. Insuline/glucagon. Ne jamais faire les deux voies opposées à fond.`,
    qcm: [
      q("La β-oxydation se déroule principalement :", ["Dans le cytosol", "Dans la matrice mitochondriale", "Dans le Golgi", "Dans le lysosome"], 1, "Après import via la navette carnitine."),
      q("Le malonyl-CoA inhibe :", ["La PFK-1", "La CPT-1 (entrée des acyl dans la mito)", "La RuBisCO", "L’uréase"], 1, "Évite le futile cycle synthèse/dégradation."),
      q("Le cycle de l’urée sert à :", ["Stocker le glucose", "Éliminer l’azote ammoniacal toxique", "Synthétiser l’ADN", "Oxyder les AG"], 1, "Urée éliminée par le rein."),
      q("En jeûne prolongé, le cerveau utilise de plus en plus :", ["Des acides gras intacts", "Des corps cétoniques", "De la cellulose", "De l’urée comme carburant"], 1, "Épargne du glucose et du muscle.",
      ),
    ],
    exercices: [
      {
        prompt: "Expliquez le cycle futile évité par l’inhibition de CPT-1 par le malonyl-CoA.",
        solution:
          "Malonyl-CoA = premier intermédiaire de la synthèse des AG. S’il est haut, pas besoin d’oxyder les AG. Bloquer CPT-1 empêche l’entrée mito des acyl-CoA, donc la β-oxydation simultanée.",
      },
    ],
  },
  {
    filiereSlug: "bch",
    niveau: 2,
    semestre: 1,
    slug: "biologie-moleculaire",
    title: "Biologie moléculaire",
    code: "BCH212",
    hours: 50,
    description: "Réplication, transcription, traduction, régulation.",
    content: `## Réplication
Semi-conservative, fourche, ADN pol, amorces ARN, brin tardif (fragments d’Okazaki), télomères (eucaryotes).

## Transcription
Promoteur, ARN pol, épissage des eucaryotes, coiffe et polyA. Opéron (rappel procaryote) vs régulation par facteurs et chromatine.

## Traduction
Code, ARNt, ribosome, initiation-élongation-terminaison. Antibiotiques (cibles procaryotes).

## Outils
PCR, restriction, clonage, séquençage. PCR : dénaturation, hybridation, élongation — exponentielle.`,
    resume: `Semi-conservative. Okazaki. Eucaryotes : épissage. Code dégénéré. PCR = 3 températures. Antibios et ribosome 70S.`,
    qcm: [
      q("Les fragments d’Okazaki sont synthétisés :", ["Sur le brin avancé en continu", "Sur le brin tardif, en 5'→3' par morceaux", "Par la RuBisCO", "Uniquement chez les virus à ARN"], 1, "L’ADN pol ne va qu’en 5'→3'."),
      q("La PCR repose sur :", ["Un ribosome", "Une ADN polymérase thermostable et des amorces", "La photosynthèse", "Le cycle de Krebs"], 1, "Taq (ou équivalent), cycles thermiques."),
      q("L’épissage concerne :", ["Les procaryotes uniquement", "Le retrait des introns des pré-ARNm eucaryotes", "La β-oxydation", "Le pH sanguin"], 1, "Splicéosome, exons conservés."),
      q("Un codon stop :", ["Code la méthionine", "Ne code pas d’AA, recrute un facteur de terminaison", "Est toujours AUG", "Est un intron"], 1, "UAA, UAG, UGA (sauf exceptions)."),
    ],
    exercices: [
      {
        prompt: "Pourquoi une amorce de PCR a-t-elle une Tm, et que se passe-t-il si elle est trop basse ?",
        solution:
          "Tm : température où l’hybride amorce-matrice est 50 % formé. Trop basse : appariements non spécifiques, bandes parasites. On calcule selon longueur et GC%.",
      },
    ],
    exams: [
      {
        title: "Épreuve de biologie moléculaire",
        year: 2025,
        content: "1. Réplication du brin tardif (8).\n2. De l’ADN à la protéine chez l’eucaryote (8).\n3. Principe de la PCR (4).",
        correction: "1. Amorces, Okazaki, ligase. 2. Transcription, maturation, export, traduction. 3. 3 étapes, exponentielle, Taq.",
      },
    ],
  },
  {
    filiereSlug: "bch",
    niveau: 2,
    semestre: 1,
    slug: "chimie-analytique",
    title: "Chimie analytique",
    code: "CHM211",
    hours: 40,
    description: "Titrages, spectro, chromatographie quantitative, validation de méthode.",
    content: `## Titrages
Équivalence, indicateurs, courbes pH. Titrage rédox (permanganimétrie).

## Spectro avancée
UV-vis, écart à Beer-Lambert, blancs, cuves. Introduction IR / fluorescence (qualitatif).

## Chromatographie quantitative
HPLC, temps de rétention, aire de pic, étalonnage interne/externe.

## Qualité
Répétabilité, justesse, limite de détection. Un chiffre sans incertitude n’est pas une mesure.`,
    resume: `Titrage = point d’équivalence. HPLC : rétention + aire. Étalonner. Toujours une incertitude. Blancs.`,
    qcm: [
      q("En HPLC, l’aire du pic, dans le domaine linéaire, est proportionnelle :", ["Au pKa", "À la quantité de soluté", "À la Tm d’une amorce", "Au ΔG°"], 1, "D’où l’étalonnage."),
      q("Un blanc sert à :", ["Augmenter Km", "Soustraire le signal du solvant/réactifs", "Calibrer une balance", "Dénaturer l’ADN"], 1, "Référence d’absorbance ou de chromatogramme."),
      q("La LOD est :", ["La limite de détection", "Un lipide", "Un codon", "Un méristème"], 0, "Plus petite concentration distinguable du bruit."),
      q("Au point d’équivalence d’un titrage fort/fort :", ["pH = pKa du faible", "Les quantités de titre et d’analyte ont réagi selon la stœchiométrie", "A = 0 toujours", "K = 1"], 1, "Ce n’est pas forcément pH 7 si les forces diffèrent, mais ici fort/fort ≈ 7."),
    ],
    exercices: [
      {
        prompt: "On titre 10,00 mL d’HCl par NaOH 0,100 mol·L⁻¹. Équivalence à 8,50 mL. [HCl] ?",
        solution: "n = 0,100 × 0,00850 = 8,50×10⁻⁴ mol. C = n/0,01000 = 0,085 mol·L⁻¹.",
      },
    ],
  },
  {
    filiereSlug: "bch",
    niveau: 2,
    semestre: 2,
    slug: "immunochimie",
    title: "Immunochimie",
    code: "BCH221",
    hours: 40,
    description: "Anticorps comme réactifs : ELISA, Western, spécificité.",
    content: `## Anticorps
Paratope, épitope, isotypes. Polyclonaux vs monoclonaux. Production (hybridomes — principe).

## ELISA
Direct, indirect, sandwich, compétition. Courbe d’étalonnage. Faux positifs (lavages, blocage).

## Western blot
SDS-PAGE → membrane → anticorps. Contrôle de charge (protéine de ménage).

## Applications
Sérodiagnostic, dosage d’hormones, recherche. Limites : réaction croisée, fenêtre sérologique.`,
    resume: `Ac = réactif de spécificité. ELISA sandwich pour doser. Western = identité + taille. Monoclonal = un épitope.`,
    qcm: [
      q("Un monoclonal reconnaît :", ["Tous les antigènes du monde", "En principe un seul épitope", "L’ADN seulement", "Le NADH"], 1, "Un clone de plasmocyte/hybridome."),
      q("Dans un ELISA sandwich, l’antigène est :", ["Fixé entre deux anticorps", "Toujours un ose", "Le substrat chromogène uniquement", "Un tampon phosphate"], 0, "Capture + détection."),
      q("Un Western blot renseigne sur :", ["La masse apparente et la reconnaissance immunologique", "Le Km", "Le pH urinaire", "La Tm d’une amorce"], 0, "Taille + épitope."),
      q("Un lavage insuffisant en ELISA :", ["Baisse toujours le bruit", "Augmente le bruit de fond (faux signal)", "Remplace le substrat", "Dénature le plastique seulement"], 1, "Ac non spécifiques restent."),
    ],
    exercices: [
      {
        prompt: "Proposez un ELISA sandwich pour doser une protéine plasmatique. Où sont les contrôles ?",
        solution:
          "Puits adsorbés d’Ac capture → échantillon → Ac détection couplé enzyme → substrat. Blancs, étalons, contrôle positif/négatif, parfois spike. Courbe log-log ou 4PL.",
      },
    ],
  },
  {
    filiereSlug: "bch",
    niveau: 2,
    semestre: 2,
    slug: "genie-genetique",
    title: "Génie génétique",
    code: "BCH222",
    hours: 45,
    description: "Clonage, vecteurs, expression recombinante, CRISPR en aperçu.",
    content: `## Clonage classique
Enzymes de restriction, ligase, plasmides (ori, marqueur, MCS), transformation, criblage (blanc-bleu).

## Expression
Promoteurs inductibles, tags (His), purification IMAC, corps d’inclusion. E. coli vs levure vs cellules animales.

## CRISPR
Cas9 + ARN guide, cassure double brin, NHEJ vs HR. Outil puissant, cadre éthique.

## Biosécurité
Niveaux, OGM, cahier. On ne « bricole » pas un vecteur viral sans cadre.`,
    resume: `Plasmide : ori + marqueur + MCS. Restriction-ligation. His-tag. CRISPR = guide + Cas9. Biosécurité non négociable.`,
    qcm: [
      q("Un plasmide de clonage porte typiquement :", ["Un centromère humain obligatoire", "Une origine de réplication et un marqueur de sélection", "Un ribosome 80S", "Du peptidoglycane"], 1, "Pour se maintenir et se sélectionner dans l’hôte."),
      q("L’IMAC purifie surtout :", ["L’ADN génomique", "Les protéines His-taguées sur nickel/cobalt", "Les lipides", "Le glycogène"], 1, "Histidines coordonnées au métal."),
      q("CRISPR-Cas9 coupe l’ADN où :", ["Le guide s’apparie (avec PAM)", "Au hasard des histones", "Sur l’ARN 28S seulement", "Dans le Golgi"], 0, "Spécificité = ARNsg + PAM."),
      q("Le criblage blanc-bleu repose sur :", ["LacZ interrompu par l’insert", "La fluorescence du NADH", "Le pH 14", "La RuBisCO"], 0, "Colonies blanches = insert probable."),
    ],
    exercices: [
      {
        prompt: "Vous clonez un ADNc dans pET pour produire une enzyme. Quelles étapes clés jusqu’à la protéine pure ?",
        solution:
          "PCR avec sites de restriction / Gibson → ligation → transformants AmpR → vérif (colonie PCR, plasmid miniprep, séquence) → BL21 (DE3) → induction IPTG → lyse → IMAC → dialyse → SDS-PAGE/activité.",
      },
    ],
  },
  {
    filiereSlug: "bch",
    niveau: 2,
    semestre: 2,
    slug: "biochimie-clinique",
    title: "Biochimie clinique",
    code: "BCH223",
    hours: 40,
    description: "Examens de routine, interprétation raisonnée, contexte camerounais.",
    content: `## Préanalytique
Jeûne, hémolyse, tube, délai. 70 % des erreurs sont là, pas dans l’automate.

## Grandes analyses
Glycémie, ionogramme, urée/créatinine, transaminases, bilan lipidique, NFS côté voisin. Valeurs de référence = populations, pas des dogmes.

## Logique
Une valeur hors norme n’est pas un diagnostic. On croise clinique, médicaments, grossesse.

## Santé publique
Diabète, insuffisance rénale, hépatites : lire un résultat sert le patient, pas la grille d’examen seulement.`,
    resume: `Préanalytique roi. Références relatives. Glycémie, rein, foie, lipides. Interpréter, pas réciter. Hémolyse fausse le K+.`,
    qcm: [
      q("Une hémolyse du tube fausse surtout :", ["Le sodium vers le bas toujours", "Le potassium (libération intra-érythrocytaire)", "La couleur des yeux", "Le groupe sanguin ABO"], 1, "K+ intra ~ 140 mmol/L."),
      q("La créatinine sérique estime surtout :", ["La fonction rénale (filtration)", "La glycolyse érythrocytaire", "Le pH gastrique", "La Tm d’amorce"], 0, "Avec limites (masse musculaire)."),
      q("Les transaminases élevées orientent vers :", ["Une souffrance hépatocytaire (entre autres)", "Une otite uniquement", "Une carence en cellulose", "Le daltonisme"], 0, "ALAT plus « foie », ASAT aussi muscle."),
      q("Le préanalytique désigne :", ["Le seul automate", "Tout ce qui précède l’analyse (patient, prélèvement, transport)", "Le compte-rendu d’anatomopathologie", "La PCR"], 1, "Source majeure d’erreurs."),
    ],
    exercices: [
      {
        prompt: "Glycémie à 1,90 g/L chez un adulte non à jeun. Que demandez-vous avant de parler de diabète ?",
        solution:
          "Jeûne ? Horaire du repas, symptômes, traitements, grossesse. Confirmer par glycémie à jeun, HbA1c selon recommandations, pas un seul chiffre post-prandial isolé.",
      },
    ],
    exams: [
      {
        title: "Cas cliniques de biochimie",
        year: 2024,
        content:
          "1. Ionogramme avec K+ à 6,8 mmol/L sur tube hémolysé — conduite (8).\n2. Interprétez une glycémie à jeun à 1,30 g/L (6).\n3. Pourquoi la créatinine d’un bodybuilder trompe (6).",
        correction:
          "1. Contrôler sur nouveau prélèvement, ECG si clinique, ne pas traiter un artefact. 2. Intolérance / diabète selon seuils, confirmer. 3. Créatinine liée à la masse musculaire, DFG estimé faussé.",
      },
    ],
  },
];
