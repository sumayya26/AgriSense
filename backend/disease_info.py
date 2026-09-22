"""
Disease information database — descriptions, severity, and treatment
recommendations for all classes in the trained models.
"""

DISEASE_INFO = {
    # ============ TOMATO (10 classes) ============
    "Tomato_Bacterial_spot": {
        "display_name": "Tomato Bacterial Spot",
        "severity": "High",
        "description": (
            "Bacterial spot is caused by Xanthomonas species. It produces small, "
            "dark, water-soaked lesions on leaves, stems, and fruit. Warm, humid "
            "conditions favor disease development."
        ),
        "treatment": [
            "Apply copper-based bactericides as a preventative measure",
            "Remove and destroy infected plant debris",
            "Use disease-free seeds and transplants",
            "Rotate crops — avoid planting tomatoes in the same spot for 2-3 years",
            "Avoid overhead watering to reduce leaf wetness"
        ]
    },
    "Tomato_Early_blight": {
        "display_name": "Tomato Early Blight",
        "severity": "Moderate",
        "description": (
            "Early blight is caused by the fungus Alternaria solani. It produces "
            "characteristic concentric ring ('target') spots on lower leaves first, "
            "progressing upward. It can also affect stems and fruit."
        ),
        "treatment": [
            "Apply fungicides containing chlorothalonil or mancozeb",
            "Remove infected lower leaves to slow spread",
            "Improve air circulation by proper spacing and pruning",
            "Use mulch to prevent soil splashing onto leaves",
            "Practice crop rotation with non-solanaceous crops"
        ]
    },
    "Tomato_Late_blight": {
        "display_name": "Tomato Late Blight",
        "severity": "High",
        "description": (
            "Late blight is caused by the oomycete pathogen Phytophthora infestans. "
            "It produces large, irregular water-soaked lesions on leaves and can "
            "rapidly destroy entire plants in cool, wet weather."
        ),
        "treatment": [
            "Apply copper-based fungicide immediately upon detection",
            "Remove and destroy all infected plant parts",
            "Improve air circulation between plants",
            "Avoid overhead irrigation — use drip watering",
            "Consider resistant varieties for future planting"
        ]
    },
    "Tomato_Leaf_Mold": {
        "display_name": "Tomato Leaf Mold",
        "severity": "Moderate",
        "description": (
            "Leaf mold is caused by the fungus Passalora fulva (Cladosporium fulvum). "
            "It appears as pale green to yellowish spots on upper leaf surfaces with "
            "olive-green to brown velvety growth on the undersides."
        ),
        "treatment": [
            "Improve greenhouse ventilation and reduce humidity",
            "Apply fungicides such as chlorothalonil",
            "Remove and destroy affected leaves",
            "Avoid wetting foliage when watering",
            "Plant resistant varieties when available"
        ]
    },
    "Tomato_Septoria_leaf_spot": {
        "display_name": "Tomato Septoria Leaf Spot",
        "severity": "Moderate",
        "description": (
            "Septoria leaf spot is caused by the fungus Septoria lycopersici. It "
            "produces numerous small, circular spots with dark borders and lighter "
            "centers, often containing tiny black fruiting bodies."
        ),
        "treatment": [
            "Apply fungicides containing chlorothalonil or copper",
            "Remove infected leaves promptly",
            "Mulch around plants to prevent soil splash",
            "Water at the base of plants, not overhead",
            "Rotate crops and remove plant debris at end of season"
        ]
    },
    "Tomato_Spider_mites_Two_spotted_spider_mite": {
        "display_name": "Tomato Spider Mites (Two-Spotted)",
        "severity": "Moderate",
        "description": (
            "Two-spotted spider mites (Tetranychus urticae) are tiny arachnids that "
            "feed on leaf cells, causing stippling, yellowing, and bronzing of leaves. "
            "They thrive in hot, dry conditions and can cause severe defoliation."
        ),
        "treatment": [
            "Spray plants with strong water jets to dislodge mites",
            "Apply insecticidal soap or neem oil",
            "Introduce predatory mites (Phytoseiulus persimilis)",
            "Maintain adequate plant hydration",
            "Avoid excessive nitrogen fertilization"
        ]
    },
    "Tomato__Target_Spot": {
        "display_name": "Tomato Target Spot",
        "severity": "Moderate",
        "description": (
            "Target spot is caused by the fungus Corynespora cassiicola. It produces "
            "brown spots with concentric rings on leaves, stems, and fruit. The "
            "disease is favored by warm, humid conditions."
        ),
        "treatment": [
            "Apply fungicides such as azoxystrobin or difenoconazole",
            "Remove and destroy infected plant parts",
            "Ensure good air circulation around plants",
            "Avoid working with wet plants to prevent spread",
            "Practice crop rotation"
        ]
    },
    "Tomato__Tomato_YellowLeaf__Curl_Virus": {
        "display_name": "Tomato Yellow Leaf Curl Virus",
        "severity": "High",
        "description": (
            "TYLCV is transmitted by whiteflies (Bemisia tabaci). Infected plants "
            "show upward curling, yellowing of leaf margins, stunted growth, and "
            "significantly reduced fruit production."
        ),
        "treatment": [
            "Control whitefly populations with insecticides or sticky traps",
            "Remove and destroy infected plants immediately",
            "Use reflective mulches to repel whiteflies",
            "Plant TYLCV-resistant tomato varieties",
            "Install fine-mesh insect screens in greenhouses"
        ]
    },
    "Tomato__Tomato_mosaic_virus": {
        "display_name": "Tomato Mosaic Virus",
        "severity": "High",
        "description": (
            "Tomato mosaic virus (ToMV) causes mottled light and dark green patterns "
            "on leaves, leaf distortion, and reduced fruit quality. It spreads easily "
            "through contaminated tools, hands, and seed."
        ),
        "treatment": [
            "Remove and destroy infected plants — there is no cure",
            "Sanitize tools and hands with milk solution or disinfectant",
            "Use certified virus-free seeds and transplants",
            "Plant resistant varieties (marked 'T' or 'TMV' resistant)",
            "Avoid tobacco use near plants (TMV can persist in tobacco)"
        ]
    },
    "Tomato_healthy": {
        "display_name": "Tomato — Healthy",
        "severity": "None",
        "description": (
            "This tomato leaf appears healthy with no visible signs of disease or "
            "pest damage. Good job maintaining plant health!"
        ),
        "treatment": [
            "Continue regular watering and fertilization schedule",
            "Monitor plants regularly for early signs of disease",
            "Maintain proper spacing for air circulation",
            "Apply preventative fungicide if conditions are wet",
            "Keep garden area clean and free of debris"
        ]
    },

    # ============ APPLE (4 classes) ============
    "Apple___Apple_scab": {
        "display_name": "Apple Scab",
        "severity": "Moderate",
        "description": "Fungal disease causing olive-green to black spots on leaves and fruit.",
        "treatment": ["Apply sulfur or copper-based fungicides", "Rake and destroy fallen leaves", "Prune to improve air circulation"]
    },
    "Apple___Black_rot": {
        "display_name": "Apple Black Rot",
        "severity": "High",
        "description": "Fungal infection causing leaf spots (frogeye), fruit rot, and limb cankers.",
        "treatment": ["Prune out infected limbs and cankers", "Apply fungicides like captan", "Remove mummified fruit"]
    },
    "Apple___Cedar_apple_rust": {
        "display_name": "Cedar Apple Rust",
        "severity": "Moderate",
        "description": "Fungus that requires both apple and cedar trees to complete its life cycle.",
        "treatment": ["Apply fungicides in spring", "Remove nearby cedar galls", "Plant resistant varieties"]
    },
    "Apple___healthy": {
        "display_name": "Apple — Healthy",
        "severity": "None",
        "description": "The apple leaf is healthy and showing no signs of disease.",
        "treatment": ["Continue regular maintenance", "Monitor for early signs of scab or rot"]
    },

    # ============ CORN (4 classes) ============
    "Corn___Cercospora_leaf_spot Gray_leaf_spot": {
        "display_name": "Corn Gray Leaf Spot",
        "severity": "High",
        "description": "Fungal disease causing rectangular, gray to tan lesions on leaves.",
        "treatment": ["Use resistant hybrids", "Practice crop rotation", "Apply fungicides if detected early"]
    },
    "Corn___Common_rust": {
        "display_name": "Corn Common Rust",
        "severity": "Moderate",
        "description": "Fungus causing cinnamon-brown pustules on both leaf surfaces.",
        "treatment": ["Plant resistant corn hybrids", "Apply fungicides early in the season", "Avoid excessive nitrogen"]
    },
    "Corn___Northern_Leaf_Blight": {
        "display_name": "Corn Northern Leaf Blight",
        "severity": "High",
        "description": "Fungus causing large, cigar-shaped, grayish-green to tan lesions.",
        "treatment": ["Use resistant hybrids", "Practice crop rotation with non-host crops", "Apply foliar fungicides"]
    },
    "Corn___healthy": {
        "display_name": "Corn — Healthy",
        "severity": "None",
        "description": "The corn leaf appears healthy and disease-free.",
        "treatment": ["Maintain soil moisture", "Monitor for pest and disease signals"]
    },

    # ============ GRAPE (4 classes) ============
    "Grape___Black_rot": {
        "display_name": "Grape Black Rot",
        "severity": "High",
        "description": "Fungal disease that can destroy an entire crop in wet seasons.",
        "treatment": ["Apply fungicides from bloom to fruit set", "Remove all mummified berries", "Prune for maximum sun exposure"]
    },
    "Grape___Esca_(Black_Measles)": {
        "display_name": "Grape Esca (Black Measles)",
        "severity": "High",
        "description": "Fungal complex affecting the wood and foliage of grapevines.",
        "treatment": ["Sanitize pruning tools between vines", "Remove and burn infected wood", "Apply wound protectants after pruning"]
    },
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": {
        "display_name": "Grape Leaf Blight",
        "severity": "Moderate",
        "description": "Fungus causing irregular reddish-brown spots on older leaves.",
        "treatment": ["Apply copper or sulfur-based fungicides", "Improve vineyard air circulation", "Remove infected foliage"]
    },
    "Grape___healthy": {
        "display_name": "Grape — Healthy",
        "severity": "None",
        "description": "The grape leaf is healthy and vibrant.",
        "treatment": ["Continue regular fertilization", "Monitor for mildew and rot symptoms"]
    },

    # ============ PEACH (2 classes) ============
    "Peach___Bacterial_spot": {
        "display_name": "Peach Bacterial Spot",
        "severity": "High",
        "description": "Bacterial disease causing small, angular, dark spots on leaves (shot-hole appearance).",
        "treatment": ["Apply copper sprays during dormancy", "Avoid high nitrogen fertilization", "Remove and destroy infected branches"]
    },
    "Peach___healthy": {
        "display_name": "Peach — Healthy",
        "severity": "None",
        "description": "The peach leaf is healthy with no visible bacterial spots.",
        "treatment": ["Prune for health", "Ensure consistent soil moisture"]
    },

    # ============ CHERRY (2 classes) ============
    "Cherry___Powdery_mildew": {
        "display_name": "Cherry Powdery Mildew",
        "severity": "Moderate",
        "description": "Fungus causing white, powdery patches on leaves and young shoots.",
        "treatment": ["Apply sulfur fungicides", "Improve air circulation", "Avoid overhead irrigation"]
    },
    "Cherry___healthy": {
        "display_name": "Cherry — Healthy",
        "severity": "None",
        "description": "The cherry leaf is healthy and clear.",
        "treatment": ["Regular monitoring", "Proper pruning practices"]
    },

    # ============ STRAWBERRY (2 classes) ============
    "Strawberry___Leaf_scorch": {
        "display_name": "Strawberry Leaf Scorch",
        "severity": "Moderate",
        "description": "Fungal disease causing dark-purple to reddish-brown spots on leaves.",
        "treatment": ["Apply fungicides in spring", "Destroy infected leaves", "Avoid overhead watering"]
    },
    "Strawberry___healthy": {
        "display_name": "Strawberry — Healthy",
        "severity": "None",
        "description": "Healthy strawberry leaf.",
        "treatment": ["Maintain mulch", "Keep bed free of weeds"]
    },

    # ============ SINGLE CLASS MODELS (Fallback/Detection) ============
    "Blueberry___healthy": {
        "display_name": "Blueberry — Healthy",
        "severity": "None",
        "description": "Healthy blueberry leaf detected.",
        "treatment": ["Maintain acidic soil pH", "Monitor for blueberry maggot or rot"]
    },
    "Orange___Haunglongbing_(Citrus_greening)": {
        "display_name": "Citrus Greening (HLB)",
        "severity": "High",
        "description": "A devastating bacterial disease spread by the Asian citrus psyllid.",
        "treatment": ["Control psyllid populations", "Remove and burn infected trees immediately", "Use disease-free nursery stock"]
    },
    "Raspberry___healthy": {
        "display_name": "Raspberry — Healthy",
        "severity": "None",
        "description": "Healthy raspberry leaf.",
        "treatment": ["Regular pruning of old canes", "Good drainage"]
    },
    "Soybean___healthy": {
        "display_name": "Soybean — Healthy",
        "severity": "None",
        "description": "Healthy soybean leaf.",
        "treatment": ["Monitor for rust", "Continue regular crop management"]
    },
    "Squash___Powdery_mildew": {
        "display_name": "Squash Powdery Mildew",
        "severity": "Moderate",
        "description": "Fungal disease causing white powdery spots on leaves.",
        "treatment": ["Apply neem oil or fungicides", "Choose resistant varieties", "Improve spacing"]
    },
}


def get_disease_info(class_name):
    """Look up disease info by class name. Falls back to generic info."""
    if class_name in DISEASE_INFO:
        return DISEASE_INFO[class_name]

    # Try fuzzy matching (handle variations in naming)
    for key, info in DISEASE_INFO.items():
        if class_name.lower().replace(" ", "_") in key.lower().replace(" ", "_"):
            return info

    # Fallback for unknown classes
    is_healthy = "healthy" in class_name.lower()
    return {
        "display_name": class_name.replace("_", " ").replace("__", " — "),
        "severity": "None" if is_healthy else "Unknown",
        "description": (
            "The plant appears healthy." if is_healthy
            else f"Disease detected: {class_name.replace('_', ' ')}. "
                 "Consult a local agricultural extension service for specific treatment advice."
        ),
        "treatment": (
            ["Continue monitoring plant health regularly"] if is_healthy
            else [
                "Consult a local plant pathologist for specific diagnosis",
                "Remove affected plant parts if possible",
                "Improve air circulation around plants",
                "Apply appropriate fungicide/pesticide after identification"
            ]
        )
    }
