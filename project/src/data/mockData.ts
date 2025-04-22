import { Disease, TreatmentPlan, CropType } from '../types';

export const mockDiseases: Disease[] = [
  {
    id: 'd1',
    name: 'Late Blight',
    scientificName: 'Phytophthora infestans',
    description: 'A destructive disease affecting potatoes and tomatoes, causing rapid tissue death and potential crop loss.',
    symptoms: [
      'Dark, water-soaked spots on leaves',
      'White, fuzzy growth on leaf undersides',
      'Rapidly spreading brown lesions',
      'Dry, brown tissue on tubers'
    ],
    causes: [
      'Fungus-like organism (oomycete)',
      'Cool, wet conditions',
      'Poor air circulation'
    ],
    severity: 'high'
  },
  {
    id: 'd2',
    name: 'Powdery Mildew',
    scientificName: 'Various fungi species',
    description: 'Common fungal disease that affects a wide range of plants, creating a powdery white coating on leaf surfaces.',
    symptoms: [
      'White, powdery spots on leaves and stems',
      'Yellowing of leaves',
      'Distorted growth',
      'Premature leaf drop'
    ],
    causes: [
      'Fungal spores',
      'Warm, dry conditions',
      'High humidity without rainfall',
      'Poor air circulation'
    ],
    severity: 'medium'
  },
  {
    id: 'd3',
    name: 'Leaf Rust',
    scientificName: 'Puccinia spp.',
    description: 'Fungal disease that primarily affects cereal crops and grasses, causing orange-brown pustules on leaves.',
    symptoms: [
      'Orange-brown pustules on leaf surfaces',
      'Chlorotic areas surrounding pustules',
      'Premature defoliation',
      'Reduced yield'
    ],
    causes: [
      'Fungal infection',
      'Warm temperatures (60-80°F)',
      'High humidity or wet conditions',
      'Susceptible crop varieties'
    ],
    severity: 'medium'
  },
  {
    id: 'd4',
    name: 'Bacterial Leaf Spot',
    scientificName: 'Xanthomonas spp.',
    description: 'Bacterial infection that causes water-soaked lesions on leaves, which later become necrotic.',
    symptoms: [
      'Water-soaked spots with yellow halos',
      'Brown to black lesions',
      'Spots that tear or fall out (shot-hole appearance)',
      'Wilting and defoliation'
    ],
    causes: [
      'Bacterial infection',
      'Warm, wet conditions',
      'Overcrowded planting',
      'Overhead irrigation'
    ],
    severity: 'medium'
  },
  {
    id: 'd5',
    name: 'Fusarium Wilt',
    scientificName: 'Fusarium oxysporum',
    description: 'Soil-borne fungal disease that blocks water-conducting tissues, causing wilting and plant death.',
    symptoms: [
      'Yellowing of lower leaves',
      'Wilting despite adequate soil moisture',
      'Brown discoloration of vascular tissue',
      'Stunted growth'
    ],
    causes: [
      'Soil-borne fungus',
      'Warm soil temperatures',
      'Poor drainage',
      'Plant stress'
    ],
    severity: 'critical'
  }
];

export const mockTreatmentPlans: TreatmentPlan[] = [
  {
    id: 'tp1',
    diseaseId: 'd1',
    organicOptions: [
      {
        id: 'o1',
        name: 'Copper-based fungicide',
        description: 'Organic copper fungicides can help prevent infection when applied before disease onset.',
        applicationMethod: 'Foliar spray at 7-10 day intervals',
        effectiveness: 75,
        costLevel: 'medium',
        environmentalImpact: 'low'
      },
      {
        id: 'o2',
        name: 'Biofungicide with Bacillus subtilis',
        description: 'Beneficial bacteria that competes with pathogens and induces plant resistance.',
        applicationMethod: 'Foliar spray weekly',
        effectiveness: 65,
        costLevel: 'medium',
        environmentalImpact: 'low'
      }
    ],
    chemicalOptions: [
      {
        id: 'c1',
        name: 'Chlorothalonil',
        description: 'Broad-spectrum fungicide that prevents spore germination.',
        applicationMethod: 'Foliar spray at 7-day intervals',
        effectiveness: 90,
        costLevel: 'medium',
        environmentalImpact: 'medium'
      },
      {
        id: 'c2',
        name: 'Mancozeb + Metalaxyl',
        description: 'Combination fungicide with protective and systemic properties.',
        applicationMethod: 'Foliar spray at 10-14 day intervals',
        effectiveness: 95,
        costLevel: 'high',
        environmentalImpact: 'medium'
      }
    ],
    preventiveMeasures: [
      'Plant resistant varieties',
      'Improve air circulation by proper spacing',
      'Avoid overhead irrigation',
      'Remove and destroy infected plant material',
      'Implement crop rotation with non-host plants'
    ],
    applicationTiming: 'Begin applications before disease onset when conditions favor disease development. Apply in early morning or evening when temperatures are cooler.',
    environmentalConsiderations: [
      'Avoid application before rain or irrigation',
      'Maintain buffer zones near water bodies',
      'Follow recommended rates to prevent resistance development',
      'Consider impact on beneficial insects'
    ]
  },
  {
    id: 'tp2',
    diseaseId: 'd2',
    organicOptions: [
      {
        id: 'o3',
        name: 'Potassium bicarbonate',
        description: 'Contact fungicide that disrupts fungal cells and changes the pH on leaf surfaces.',
        applicationMethod: 'Foliar spray at 7-14 day intervals',
        effectiveness: 80,
        costLevel: 'low',
        environmentalImpact: 'low'
      },
      {
        id: 'o4',
        name: 'Neem oil',
        description: 'Plant-derived oil with fungicidal properties.',
        applicationMethod: 'Foliar spray every 7-10 days',
        effectiveness: 70,
        costLevel: 'low',
        environmentalImpact: 'low'
      }
    ],
    chemicalOptions: [
      {
        id: 'c3',
        name: 'Myclobutanil',
        description: 'Systemic fungicide effective against powdery mildew.',
        applicationMethod: 'Foliar spray at 10-14 day intervals',
        effectiveness: 95,
        costLevel: 'medium',
        environmentalImpact: 'medium'
      },
      {
        id: 'c4',
        name: 'Tebuconazole',
        description: 'Broad-spectrum systemic fungicide.',
        applicationMethod: 'Foliar spray at 14-21 day intervals',
        effectiveness: 90,
        costLevel: 'medium',
        environmentalImpact: 'medium'
      }
    ],
    preventiveMeasures: [
      'Plant resistant varieties',
      'Improve air circulation',
      'Avoid excessive nitrogen fertilization',
      'Remove and destroy infected plant material',
      'Use drip irrigation instead of overhead watering'
    ],
    applicationTiming: 'Begin at first sign of disease. Apply in morning so leaves can dry during the day.',
    environmentalConsiderations: [
      'Rotate fungicide classes to prevent resistance',
      'Minimize drift to non-target areas',
      'Observe pre-harvest intervals',
      'Consider effects on pollinators'
    ]
  },
  {
    id: 'tp3',
    diseaseId: 'd3',
    organicOptions: [
      {
        id: 'o5',
        name: 'Sulfur dust or spray',
        description: 'Elemental sulfur prevents spore germination.',
        applicationMethod: 'Dust or spray at 7-10 day intervals',
        effectiveness: 75,
        costLevel: 'low',
        environmentalImpact: 'low'
      },
      {
        id: 'o6',
        name: 'Compost tea',
        description: 'Liquid extract of compost containing beneficial microorganisms.',
        applicationMethod: 'Foliar spray weekly',
        effectiveness: 60,
        costLevel: 'low',
        environmentalImpact: 'low'
      }
    ],
    chemicalOptions: [
      {
        id: 'c5',
        name: 'Propiconazole',
        description: 'Systemic fungicide effective against many rust diseases.',
        applicationMethod: 'Foliar spray at 14-21 day intervals',
        effectiveness: 90,
        costLevel: 'medium',
        environmentalImpact: 'medium'
      },
      {
        id: 'c6',
        name: 'Azoxystrobin',
        description: 'Broad-spectrum systemic fungicide with preventive and curative action.',
        applicationMethod: 'Foliar spray at 10-14 day intervals',
        effectiveness: 95,
        costLevel: 'high',
        environmentalImpact: 'medium'
      }
    ],
    preventiveMeasures: [
      'Plant resistant varieties',
      'Maintain good field sanitation',
      'Implement crop rotation',
      'Control volunteer plants that may harbor disease',
      'Optimize plant spacing for air circulation'
    ],
    applicationTiming: 'Begin applications at first sign of disease or when conditions favor disease development. Continue throughout growing season as needed.',
    environmentalConsiderations: [
      'Follow resistance management guidelines',
      'Avoid application during windy conditions',
      'Maintain buffer zones near sensitive areas',
      'Consider impact on water sources'
    ]
  },
  {
    id: 'tp4',
    diseaseId: 'd4',
    organicOptions: [
      {
        id: 'o7',
        name: 'Copper fungicide/bactericide',
        description: 'Broad-spectrum bactericide that prevents bacterial multiplication.',
        applicationMethod: 'Foliar spray at 7-10 day intervals',
        effectiveness: 70,
        costLevel: 'medium',
        environmentalImpact: 'medium'
      },
      {
        id: 'o8',
        name: 'Bacillus subtilis',
        description: 'Beneficial bacteria that competes with pathogens.',
        applicationMethod: 'Foliar spray every 7 days',
        effectiveness: 65,
        costLevel: 'medium',
        environmentalImpact: 'low'
      }
    ],
    chemicalOptions: [
      {
        id: 'c7',
        name: 'Streptomycin sulfate',
        description: 'Antibiotic effective against bacterial pathogens (restricted use in many areas).',
        applicationMethod: 'Foliar spray at 4-5 day intervals during critical periods',
        effectiveness: 85,
        costLevel: 'high',
        environmentalImpact: 'medium'
      },
      {
        id: 'c8',
        name: 'Oxytetracycline',
        description: 'Antibiotic that suppresses bacterial multiplication.',
        applicationMethod: 'Foliar spray at 7-day intervals',
        effectiveness: 80,
        costLevel: 'high',
        environmentalImpact: 'medium'
      }
    ],
    preventiveMeasures: [
      'Plant pathogen-free seed or transplants',
      'Avoid overhead irrigation',
      'Improve air circulation',
      'Practice crop rotation',
      'Remove and destroy infected plant material',
      'Disinfect tools between plants'
    ],
    applicationTiming: 'Begin applications before disease onset or at first symptoms. Apply during dry conditions when leaves can dry quickly.',
    environmentalConsiderations: [
      'Copper can accumulate in soil with repeated use',
      'Antibiotics may contribute to resistance development',
      'Follow label directions carefully',
      'Consider alternatives to antibiotics where possible'
    ]
  },
  {
    id: 'tp5',
    diseaseId: 'd5',
    organicOptions: [
      {
        id: 'o9',
        name: 'Beneficial microbial inoculants',
        description: 'Beneficial fungi and bacteria that compete with pathogens and induce plant resistance.',
        applicationMethod: 'Soil drench at planting and throughout growing season',
        effectiveness: 60,
        costLevel: 'medium',
        environmentalImpact: 'low'
      },
      {
        id: 'o10',
        name: 'Compost and biofumigation',
        description: 'Organic matter that promotes beneficial soil microbes and suppresses pathogens.',
        applicationMethod: 'Incorporate into soil before planting',
        effectiveness: 55,
        costLevel: 'low',
        environmentalImpact: 'low'
      }
    ],
    chemicalOptions: [
      {
        id: 'c9',
        name: 'Prothioconazole',
        description: 'Systemic fungicide with protective and curative activity.',
        applicationMethod: 'Seed treatment or soil drench',
        effectiveness: 75,
        costLevel: 'high',
        environmentalImpact: 'medium'
      },
      {
        id: 'c10',
        name: 'Fludioxonil',
        description: 'Contact fungicide that protects against soil-borne pathogens.',
        applicationMethod: 'Seed treatment',
        effectiveness: 70,
        costLevel: 'medium',
        environmentalImpact: 'medium'
      }
    ],
    preventiveMeasures: [
      'Plant resistant varieties',
      'Practice long crop rotation (4+ years)',
      'Improve soil drainage',
      'Maintain optimal soil pH',
      'Use raised beds in problem areas',
      'Solarize soil where feasible'
    ],
    applicationTiming: 'Apply biological controls at planting. For infected fields, consider preventive measures for future seasons as curative treatments have limited efficacy.',
    environmentalConsiderations: [
      'Soil fumigants can have substantial environmental impacts',
      'Consider integrated approaches',
      'Some fungicides may affect soil microbial communities',
      'Maintain soil health through organic matter addition'
    ]
  }
];

export const mockCropTypes: CropType[] = [
  {
    id: 'ct1',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    growthStages: ['Seedling', 'Vegetative', 'Flowering', 'Fruit Development', 'Ripening']
  },
  {
    id: 'ct2',
    name: 'Wheat',
    scientificName: 'Triticum aestivum',
    growthStages: ['Germination', 'Seedling', 'Tillering', 'Stem Extension', 'Heading', 'Flowering', 'Grain Fill', 'Ripening']
  },
  {
    id: 'ct3',
    name: 'Apple',
    scientificName: 'Malus domestica',
    growthStages: ['Dormant', 'Silver Tip', 'Green Tip', 'Tight Cluster', 'Pink', 'Bloom', 'Petal Fall', 'Fruit Development', 'Harvest']
  },
  {
    id: 'ct4',
    name: 'Soybean',
    scientificName: 'Glycine max',
    growthStages: ['Emergence', 'Vegetative', 'Flowering', 'Pod Development', 'Seed Fill', 'Maturity']
  },
  {
    id: 'ct5',
    name: 'Potato',
    scientificName: 'Solanum tuberosum',
    growthStages: ['Sprout Development', 'Vegetative Growth', 'Tuber Initiation', 'Tuber Bulking', 'Maturation']
  }
];