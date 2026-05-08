import type { Locale } from "@/i18n/routing";

export type ArticleSlug =
  | "bmw-warning-lights"
  | "preventive-maintenance"
  | "pre-purchase-inspections"
  | "common-repair-mistakes"
  | "bmw-motorrad-care";

type LocalizedArticle = {
  category: string;
  title: string;
  preview: string;
  publishedLabel: string;
  readTime: string;
  body: string[];
};

export type Article = LocalizedArticle & {
  slug: ArticleSlug;
};

const articleOrder: ArticleSlug[] = [
  "bmw-warning-lights",
  "preventive-maintenance",
  "pre-purchase-inspections",
  "common-repair-mistakes",
  "bmw-motorrad-care"
];

const articles: Record<Locale, Record<ArticleSlug, LocalizedArticle>> = {
  en: {
    "bmw-warning-lights": {
      category: "BMW warning lights",
      title: "BMW warning lights deserve context before conclusions.",
      preview:
        "A warning light is a starting point, not a full diagnosis. Careful checks help avoid rushed parts replacement.",
      publishedLabel: "Advice",
      readTime: "3 min read",
      body: [
        "A dashboard warning light should be treated as useful information, not a final answer. Modern BMW systems can flag related symptoms from several modules, so the first step is to understand the condition around the warning.",
        "Good diagnosis looks at stored faults, live data, service history and the driver's description. That context helps separate a weak battery, a sensor issue and a deeper mechanical concern.",
        "If the car feels different, makes new noises or shows red warnings, it is sensible to stop and ask for guidance before continuing to drive."
      ]
    },
    "preventive-maintenance": {
      category: "Preventive maintenance",
      title: "Preventive maintenance works best when it follows real use.",
      preview:
        "Mileage matters, but age, short trips and heat cycles can be just as important for service planning.",
      publishedLabel: "Maintenance",
      readTime: "4 min read",
      body: [
        "Preventive maintenance is not only about following a mileage number. Vehicles used for short trips, traffic and heat can need attention before a generic interval suggests it.",
        "Oil condition, filters, brake fluid, coolant, tyres and suspension checks all give a clearer picture of how the vehicle is ageing.",
        "A calm maintenance plan helps owners avoid surprise repairs while keeping the car pleasant and dependable."
      ]
    },
    "pre-purchase-inspections": {
      category: "Pre-purchase inspections",
      title: "A pre-purchase inspection should make the decision clearer.",
      preview:
        "The aim is not to find perfection. It is to understand condition, risk and what ownership may need next.",
      publishedLabel: "Inspection",
      readTime: "4 min read",
      body: [
        "A premium vehicle can look clean and still carry deferred maintenance, hidden repairs or early signs of expensive faults.",
        "A useful inspection reviews visible condition, road behaviour, diagnostic information and service history together.",
        "The best outcome is a clearer buying decision: proceed, negotiate, plan future work or walk away."
      ]
    },
    "common-repair-mistakes": {
      category: "Common repair mistakes",
      title: "Common repair mistakes often start with guessing.",
      preview:
        "Replacing parts without confirming the fault can make repairs more expensive and less reliable.",
      publishedLabel: "Repair advice",
      readTime: "3 min read",
      body: [
        "The fastest repair is not always the first part that seems related to the symptom. Guesswork can hide the original problem and add avoidable cost.",
        "Good repair work starts with confirmation: what failed, why it failed and whether another issue caused it.",
        "Clear testing before approval protects the customer and leads to a more reliable repair."
      ]
    },
    "bmw-motorrad-care": {
      category: "BMW Motorrad care",
      title: "BMW Motorrad care needs the same discipline as car service.",
      preview:
        "Motorcycle service benefits from precise inspections, electrical checks and attention to how the bike is used.",
      publishedLabel: "Motorrad",
      readTime: "3 min read",
      body: [
        "BMW Motorrad owners often notice small changes quickly. Brake feel, charging behaviour, tyre condition and suspension response all matter to confidence on the road.",
        "A careful inspection considers the bike's use, storage, mileage and previous maintenance.",
        "Regular checks help keep small concerns from becoming inconvenient failures."
      ]
    }
  },
  fr: {
    "bmw-warning-lights": {
      category: "Voyants BMW",
      title: "Les voyants BMW demandent du contexte avant les conclusions.",
      preview:
        "Un voyant est un point de depart, pas un diagnostic complet. Des controles soignes evitent les remplacements precipites.",
      publishedLabel: "Conseil",
      readTime: "3 min de lecture",
      body: [
        "Un voyant au tableau de bord doit etre traite comme une information utile, pas comme une reponse finale. Les systemes BMW modernes peuvent remonter des symptomes lies a plusieurs modules.",
        "Un bon diagnostic regarde les defauts stockes, les donnees en direct, l'historique et la description du conducteur.",
        "Si la voiture se comporte differemment, fait un nouveau bruit ou affiche un voyant rouge, il vaut mieux demander conseil avant de continuer a rouler."
      ]
    },
    "preventive-maintenance": {
      category: "Maintenance preventive",
      title: "La maintenance preventive fonctionne mieux quand elle suit l'usage reel.",
      preview:
        "Le kilometrage compte, mais l'age, les courts trajets et les cycles de chaleur comptent aussi.",
      publishedLabel: "Entretien",
      readTime: "4 min de lecture",
      body: [
        "La maintenance preventive ne consiste pas seulement a suivre un chiffre de kilometrage. Les courts trajets, la circulation et la chaleur peuvent avancer certains besoins.",
        "L'etat de l'huile, les filtres, le liquide de frein, le refroidissement, les pneus et la suspension donnent une image plus juste.",
        "Un plan d'entretien calme aide a eviter les surprises et garde le vehicule agreable et fiable."
      ]
    },
    "pre-purchase-inspections": {
      category: "Inspections avant achat",
      title: "Une inspection avant achat doit rendre la decision plus claire.",
      preview:
        "Le but n'est pas de trouver la perfection, mais de comprendre l'etat, le risque et les prochains besoins.",
      publishedLabel: "Inspection",
      readTime: "4 min de lecture",
      body: [
        "Un vehicule premium peut paraitre propre tout en cachant un entretien reporte, des reparations anciennes ou des signes de pannes couteuses.",
        "Une inspection utile relie l'etat visible, le comportement routier, les informations diagnostic et l'historique.",
        "Le meilleur resultat est une decision plus claire : acheter, negocier, planifier des travaux ou passer son chemin."
      ]
    },
    "common-repair-mistakes": {
      category: "Erreurs de reparation courantes",
      title: "Les erreurs de reparation commencent souvent par des suppositions.",
      preview:
        "Remplacer des pieces sans confirmer la panne peut rendre la reparation plus chere et moins fiable.",
      publishedLabel: "Conseil reparation",
      readTime: "3 min de lecture",
      body: [
        "La reparation la plus rapide n'est pas toujours la premiere piece qui semble liee au symptome. Les suppositions peuvent masquer le probleme d'origine.",
        "Un bon travail commence par la confirmation : ce qui a echoue, pourquoi et si une autre cause existe.",
        "Des tests clairs avant validation protegent le client et conduisent a une reparation plus fiable."
      ]
    },
    "bmw-motorrad-care": {
      category: "Soin BMW Motorrad",
      title: "Le soin BMW Motorrad demande la meme discipline que l'entretien automobile.",
      preview:
        "L'entretien moto beneficie d'inspections precises, de controles electriques et d'attention a l'usage.",
      publishedLabel: "Motorrad",
      readTime: "3 min de lecture",
      body: [
        "Les proprietaires BMW Motorrad remarquent souvent les petits changements rapidement. Le freinage, la charge, les pneus et la suspension comptent pour la confiance.",
        "Une inspection soignee tient compte de l'usage, du stockage, du kilometrage et de l'entretien precedent.",
        "Des controles reguliers evitent que de petites inquietudes deviennent des pannes genantes."
      ]
    }
  }
};

export function getArticles(locale: Locale): Article[] {
  return articleOrder.map((slug) => ({
    slug,
    ...articles[locale][slug]
  }));
}

export function getArticle(locale: Locale, slug: string) {
  if (!articleOrder.includes(slug as ArticleSlug)) {
    return null;
  }

  return {
    slug: slug as ArticleSlug,
    ...articles[locale][slug as ArticleSlug]
  };
}

export function getArticleSlugs() {
  return articleOrder;
}
