from diffusers import DiffusionPipeline


prompt = "{homogenized}, centrally positioned, is depicted against a plain white background. The character is white, {tall}, round creature. Its eyes are large {longlife}. Its mouth is a cheerful smile.  The character's has the friendly expression. The character is {body} and in a pose of {character}. The perspective is straight-on, from a slightly elevated viewpoint. The lighting is even, creating a bright and cheerful atmosphere. The overall style is cartoonish and playful.  The character appears childlike, lacking any detailed features beyond its friendly expression and playful pose. There are no accessories, and no discernible clothing.  The composition is simple and clean, focusing on the {character} expression and action of the character."

characters = [
    "Tsundere",
    "Moody",
    "Smart",
    "Mischievous",
    "Active",
    "Emotional",
    "Spoiled",
    "Lonely",
    "Kind",
    "Calm",
    "Quiet",
    "Relaxed",
    "Sociable",
]

body = ["thin", "normal", "fat"]
tall = ["one-head-tall", "two-head-tall", "three-head-tall", "four-head-tall"]
homogenized = ["A cartoon character", "A 3d character"]
longlife = ["", "and Dignified"]
models = [
    "tensor-diffusion/anime3d-mix",
    "stable-diffusion-v1-5/stable-diffusion-v1-5",
    "Lykon/AnyLoRA",
    "stabilityai/stable-diffusion-xl-base-1.0",
]
for b in body:
    for t in tall:
        for h in homogenized:
            for l in longlife:
                for c in characters:
                    for m in models:
                        for i in range(5):
                            pipe = DiffusionPipeline.from_pretrained(m)
                            image = pipe(
                                prompt.format(
                                    character=c,
                                    body=b,
                                    tall=t,
                                    homogenized=h,
                                    longlife=l,
                                )
                            ).images[0]
                            image.save(
                                "image"
                                + m.split("/")[1]
                                + b
                                + t
                                + h
                                + l
                                + c
                                + str(i)
                                + ".png"
                            )
