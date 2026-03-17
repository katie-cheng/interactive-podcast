export type Chunk = {
  id: number;
  transcript: string;
  speakerLabel?: string;
  annotation: string;
  isFinalAnnotation?: boolean;
};

export const CHUNKS: Chunk[] = [
  {
    id: 1,
    transcript: `"This is State of the Human, the podcast of the Stanford Storytelling Project. Each episode we take a common human experience and bring you stories that deepen our understanding of our shared humanity. In today's story, Katie Cheng uncovers a part of her dad's past that shifts her understanding of him."`,
    annotation: `My dad's story is set in 1980s San Francisco. Mine is set in 2026 Silicon Valley. The medium has changed — he had a Pentel pen, I have a terminal window. The question of what it means to make something, and whether anyone will value it, hasn't.`,
  },
  {
    id: 2,
    transcript: `"My dad wakes me up at the crack of dawn to hit the road. I don't think he's ever been late to a single thing in his life. But today I'm glad for the wake up it's move in day at Stanford. The day where I officially start college, I leave my parents. And my childhood behind. I'm still half asleep on the drive there when my dad clears his throat. Since you're 18 now, he says, I can tell you that I used to be a well-known graffiti artist in high school. He drops it like it's the most casual thing in the world, but I'm like you were a well-known what?"`,
    annotation: `He waited until I was 18 to tell me. I wonder if he was waiting until I was old enough to understand that people contain contradictions — that you can be the person who breaks rules and the person who makes you follow them. In AI, we call this alignment. Getting a system to do what you actually want, not just what you said. My dad spent 18 years aligning me. I'm not sure I've figured out yet what I actually want.`,
  },
  {
    id: 3,
    transcript: `"My dad and I are close. When he was in his thirties, he quit his job to raise me and my brother. Up until this moment, I think I know him as well as he knows me. I try to imagine him with a vigilante style mask. Aerosol cans, clanking in his bag, lurking in alleyways in the middle of the night to leave neon messages on unsuspecting brick walls, like a scene out of Spider-Man into the spider verse. I smile. It's kind of badass, but I just can't see it being true. It challenges every single idea I have of him. There's a ravine of dissonance between that artistic criminal teenager and the man that he is today. A five eight Asian dad in a Berkeley engineering sweatshirt. He's pragmatic. He's risk averse. He has no patience for impractical pastimes. He's usually telling me to study hard for a software job or scolding me for my parking tickets."`,
    annotation: `Engineer vs. artist. It's the binary I've been handed my whole life too. Study for a software job — that's the Berkeley engineering sweatshirt talking. But I also paint. I've painted since I was a kid. And now I'm building AI systems that can generate images in seconds that would take me hours. I don't know whether that makes me more of an artist or less of one. I don't know if my dad does either.`,
  },
  {
    id: 4,
    transcript: `"It is clear that I'm not getting any more graffiti related information out of him today. I hug my dad goodbye, but I can't stop thinking about this bomb that he's dropped. If I was missing this piece of his story, how many other pieces are hidden from me? Was he in a gang? Was vandalism the extent of his adventures? I've been so comfortable thinking of him as my dad and my dad only. I don't want that to change. I'm curious, but every time I think about asking him more, I just put it off. It feels like a part of him that as his kid, I'm not really supposed to know about. I decide to leave it alone."`,
    annotation: `There are parts of AI systems I'm not supposed to know about either. The training data, the labor behind it, the ghost workers who labeled images for cents an hour so that the model could learn what a cat looks like. The graffiti artists whose work got scraped into a dataset without their consent so that Midjourney could learn style. We leave those parts alone too. It's easier.`,
  },
  {
    id: 5,
    transcript: `"It's been two years since that conversation, but I still think about it. Every time I see graffiti, I get so curious. I kind of wanna try it. So when my friends Lela Reyna and Will invite me to check out a graffiti tunnel hidden under a park in Palo Alto. How could I say no? To get there, we tramp through bushes, down an embankment, and over a chain link fence."`,
    annotation: `Palo Alto. Where else. The city that contains both a graffiti tunnel and the headquarters of companies building systems that are putting graphic designers out of work. I keep thinking about that proximity — the spray can and the data center, a mile apart.`,
  },
  {
    id: 6,
    transcript: `"The tunnel is about ten feet tall, fifteen feet wide, and covered in colorful graffiti. It stretches back as far as we can see and then fades into darkness. When we turn off all our flashlights, it's pitch black. And then at last, we do what we came for. [spray can sounds] And I have to admit, it's fun. Kind of thrilling. But also not as big of a deal as I thought it would be. Now that we're deep inside this tunnel where people have been tagging and spraying for decades, it doesn't feel like we're doing anything illegal. It feels normal. It's kinda cool to think each piece has a person behind it."`,
    annotation: `Each piece has a person behind it. That's the thing AI-generated art can't replicate — not the image, but the person. The need. My dad didn't spray paint because he wanted to make something beautiful. He did it because he needed to exist somewhere outside of himself. That need is not trainable. You cannot fine-tune desperation.`,
  },
  {
    id: 7,
    transcript: `"My dad is such a practical person – he's very quick to dismiss anything he doesn't see as productive. I can only imagine him looking at this graffiti and saying 'don't be like them, focus on school. And don't waste time in random tunnels.' The following week, my legs break out in a rash: apparently there was poison oak in those bushes. I call my dad to ask how I should treat it, and he says he'll bring me the perfect medication. Before I even have time to thank him, he asks me how I managed to get poison oak."`,
    annotation: `He still shows up. That's the thing about him — for all his pragmatism, he drove to campus to bring me medication for a rash I got doing something he would have told me not to do. I think about this when I think about what it means to build technology that 'helps.' Helping isn't optimization. It's showing up with the right medicine without making someone feel stupid for needing it.`,
  },
  {
    id: 8,
    transcript: `"Dave: Let me back up, okay? I went from a fairly high social standing while growing up to the absolute bottom because I was now stupid Chinese FOB. I dressed funny. I talked funny. I knew English. That just meant that I knew all the crap they were talking about me. So here I was, at the end of 8th grade, I swore that I'm not going to be at the bottom anymore. I'm going to be cool. I didn't care what I had to do. I didn't want to be a stupid fob. I want to be a cool kid."`,
    speakerLabel: "Dave",
    annotation: `He needed to be seen to survive. That's not vanity — that's the logic of someone who has been made invisible. I think about this when I think about who AI systems are built to see. Facial recognition that works better on white faces. Voice recognition that struggles with accents. Systems trained on data that reflects who has historically been centered. My dad was a FOB who became a local legend through graffiti. The algorithm would have never surfaced him.`,
  },
  {
    id: 9,
    transcript: `"Dave: The thing with San Francisco is that the bus system is so good that a lot of kids intermingle. everybody in the back would bust out these really wide markers called pentel pens and just start, you know, tagging stuff up. You couldn't see out of the window because people would scrawl on it. I mean, anybody could tag. San Francisco is so small that everybody would meet up at the Forest Hill bus station. You would have probably a hundred kids there hanging out after school. you want to be known amongst the crowd as somebody special. And the way to be special is to be up. And by up, I mean people see your tag around. And then people talk about you. Like, are you good? Do you have style?"`,
    speakerLabel: "Dave",
    annotation: `Being 'up' meant your tag was everywhere — visibility earned through physical presence, risk, repetition. In 2026 being 'up' means the algorithm decides your reach. You can make the most original thing in the world and it surfaces to no one. Or you can make something deliberately optimized for engagement and it goes everywhere. My dad earned his visibility by breaking the law at 2am. I'm trying to build things that matter. I'm not sure which one requires more of you.`,
  },
  {
    id: 10,
    transcript: `"Dave: I remember, you know, waking up at two o'clock in the morning, going down to a bus stop parking lot. And we would sneak in and just start going down the line. And that's one of the things that they respected, you know, because I broke the law all the time. The majority of the graffiti in San Francisco was put up by kids like us. It's not positive. It's a public menace. So people are trying to do bad things, and you're trying to compete to see who's better at the bad things anyways."`,
    speakerLabel: "Dave",
    annotation: `A public menace. That's what they called graffiti. It's what they call a lot of things before they become culture, before they become art, before they become a museum exhibit. I wonder what we're calling a public menace right now that our kids will put in a gallery.`,
  },
  {
    id: 11,
    transcript: `"Dave: My dad literally offered me, 'You know, look, I know you want a car. If you get into Berkeley or a good school, I will buy you a car.' Here's a carrot. Go get it. And being the greedy ass that I am, I went for it. I chose to grow up at that moment. I left behind the people who were bad influences. I chose to start working towards my future. He stops doing graffiti. He goes to every one of his teachers and basically negotiates a better grade. Most of them actually say yes. He tells them he's going to turn his life around, and the bribe works. Dave: I got a car."`,
    speakerLabel: "Dave",
    annotation: `He put down the Pentel pen for a car, for Berkeley, for engineering. Society made the trade worth it. I keep asking myself what the equivalent trade is being offered to artists right now. Use our tools, we'll give you reach, efficiency, scale. Give us your style, your data, your labor. Sign here. I don't think the car is as good this time.`,
  },
  {
    id: 12,
    transcript: `"Dave: I literally had no excuse to go hang out at the bus station. Like the, the calling of, you know, the need to be cool with those people didn't exist anymore. I fell off the map. Yeah. But it didn't matter to me. I never carried a Pentel pen in my pocket anymore. Dave: There were a lot of kids with problems hanging out in the streets. One of my best friends there was a guy named Eddie. His dad was like kicking his ass at home. Being destructive was, like, an outlet for him. And while I was in college, dude got shot to death. I mean, he was fighting over some girl and some guy pulled out a gun and shot him to death."`,
    speakerLabel: "Dave",
    annotation: `Eddie didn't get a car. Eddie didn't get a pivot point. The difference between my dad's story and Eddie's isn't talent or drive — it's that my dad had parents who were paying enough attention to bribe him. I think about the artists who don't have that. The ones whose creative labor is feeding AI training sets right now, without credit, without compensation, without anyone paying enough attention to offer them a better deal.`,
  },
  {
    id: 13,
    transcript: `"Katie: Do you regret that part of your life? Dave: I don't live my life with regrets. it served its purpose. I grew up. So do I regret it? No. Am I really proud of it? No. Early in my career as an engineer, I had to go to a lot of different manufacturing plants with a lot of different low hourly paid dudes and my ability to converse with them was super helpful. And guess where I learned it? Being on the streets, running around with punk ass kids. If I hadn't done that, maybe my self confidence wouldn't have been as good. I mean, who knows, right? Who knows?"`,
    speakerLabel: "Katie / Dave",
    annotation: `The graffiti made him a better engineer. The thing he was told to abandon gave him the thing that made him succeed. I think about this constantly. My art practice makes me a better engineer — the way I think about visual systems, about what a user sees and feels, about negative space. But the industry doesn't have a line on the resume for that. There's no benchmark for it. If it can't be measured, the algorithm doesn't see it.`,
  },
  {
    id: 14,
    transcript: `"Katie: I'm doing painting now. Dave: Oh, okay. Katie: Is that a waste of time to you? Dave: Is it? No, I mean I mean, if, if you have a requirement to take an art class, and I guess, you know Well, Katie: I'm just taking it for fun. Dave: Okay. Katie: So you're not, like, proud that I'm also, like, okay at art, or like you? Dave: I'm happy that you found something that you like to do, okay? Because the world is more than just making money and studying. Like, you gotta do things that you find enjoyable. Katie: Listening back to this moment with my dad, it's so obvious what I'm fishing for. I want him to say that he's proud of me–not just for being a good student, but for doing art. Like him."`,
    speakerLabel: "Katie / Dave",
    annotation: `He didn't know what to do with my painting. Neither does my recruiter. Neither do I, fully. I'm a painter who builds AI systems that can generate paintings. I'm still figuring out whether that makes me a traitor to something or just a person living in a specific historical moment, trying to do both things honestly.`,
  },
  {
    id: 15,
    transcript: `"Dave: There was a scene set in San Francisco. Spock is sitting on a bus. And I remember being at the movie theater with a bunch of these guys. There were probably 20 of us. And the scene comes on. And, wouldn't you know it, my tag is right behind Spock's head. And the whole theater was like, 'Oh my god, Dave!' Katie: Were you proud of that? Dave: Oh, at the time, yes. Now, you know, I don't tell anybody. That's not your dad."`,
    speakerLabel: "Dave / Katie",
    annotation: `His tag made it into a movie. Permanently. Uncredited. The director didn't know it was there. The studio didn't pay him. It became part of the film's texture, its realness, its San Francisco-ness — and he got nothing except the moment in that theater when his friends saw it. That's actually exactly what's happening to artists whose work is in AI training data right now. Except they don't even get the moment in the theater.`,
  },
  {
    id: 16,
    transcript: `"It occurs to me as we're talking that my dad has always been the same exact person, just at different stages of life. Whenever he has a goal, he fully commits and works relentlessly towards it— back then, it was to become popular by doing graffiti. Next, it was to become a self-made millionaire as an engineer. And finally, it was to be the best father he can be to my brother and I. So far, he's three for three."`,
    annotation: `He committed completely every time. Graffiti, engineering, fatherhood. Each one abandoned the last, but the drive was the same. I wonder if I'll have to make that same choice — art or engineering, not both. I hope the answer is different in my generation. But I'm not sure the world has actually changed that much. It's just that now the thing asking you to choose isn't a bribe for a car. It's an AI tool that makes the art for you, faster, cheaper, and without any of the need.`,
  },
  {
    id: 17,
    transcript: `"I'm 20 now. As I step into my future, I have a decent idea of what I want to pursue in my career. But what really motivates me to support myself early on is making sure I can invest as much time, and energy, and heart as he did for me, into my own children. I've thought a lot about his big parenting sacrifice. I truly believe that I wouldn't be half of who I am today without the time and effort he invested in raising me. It makes me want to be as present of a parent as he was because I know it makes 100% the difference in a kid's upbringing."`,
    annotation: `My dad picked up a Pentel pen because he needed to belong.\nI picked up my own — a paintbrush, a keyboard, a terminal — because he made sure I never had to need it the way he did.\nHe gave me that freedom. The question I carry into my future isn't whether I can be both an artist and an engineer. It's what kind of world I'm building — and whether the things I make will give someone else that same freedom.\nIn a world where AI can generate the art, I want to be the person who still asks why someone needed to make it in the first place.`,
    isFinalAnnotation: true,
  },
];
