const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function movies() {
    await prisma.movie.create({
        data: {
            title: 'Inside Out',
            year: 2015,
        },
    });
    await prisma.movie.create({
        data: {
            title: 'Arrival',
            year: 2016,
        }
    });
    await prisma.movie.create({
        data: {
            title: 'Big Eyes',
            year: 2014,
        }
    });
    await prisma.movie.create({
        data: {
            title: '28 Weeks Later',
            year: 2007,
        }
    });
    await prisma.movie.create({
        data: {
            title: 'The Witch',
            year: 2015,
        }
    });
}

async function actors() {
    await prisma.actor.create({
        data: {
            name: 'Amy Adams',
            birth_date: new Date("1974-08-20"),
        }
    });
    await prisma.actor.create({
        data: {
            name: 'Jeremy Renner',
            birth_date: new Date("1971-01-07"),
        }
    });
    await prisma.actor.create({
        data: {
            name: 'Robert Carlyle',
            birth_date: new Date("1961-04-14"),
        }
    });
    await prisma.actor.create({
        data: {
            name: 'Christoph Waltz',
            birth_date: new Date("1956-10-04"),
        }
    });
    await prisma.actor.create({
        data: {
            name: 'Amy Poehler',
            birth_date: new Date("1971-09-16"),
        }
    });
    await prisma.actor.create({
        data: {
            name: 'Bill Hader',
            birth_date: new Date("1978-07-07"),
        }
    });
    await prisma.actor.create({
        data: {
            name: 'Cillian Murphy',
            birth_date: new Date("1976-05-25"),
        }
    });
}

async function actorMovies() {
    const insideOut = await prisma.movie.findFirst({
        where: {
            title: 'Inside Out'
        }
    });
    const arrival = await prisma.movie.findFirst({
        where: {
            title: 'Arrival'
        }
    });
    const weeksLater = await prisma.movie.findFirst({
        where: {
            title: '28 Weeks Later'
        }
    });
    const bigEyes = await prisma.movie.findFirst({
        where: {
            title: 'Big Eyes'
        }
    });

    const amyAdams = await prisma.actor.findFirst({
        where: {
            name: 'Amy Adams',
        }
    });
    const jeremyRanner = await prisma.actor.findFirst({
        where: {
            name: 'Jeremy Renner'
        }
    });
    const robertCarlyle = await prisma.actor.findFirst({
        where: {
            name: 'Robert Carlyle'
        }
    });
    const christophWaltz = await prisma.actor.findFirst({
        where: {
            name: 'Christoph Waltz'
        }
    });
    const amyPoehler = await prisma.actor.findFirst({
        where: {
            name: 'Amy Poehler'
        }
    });
    const billHader = await prisma.actor.findFirst({
        where: {
            name: 'Bill Hader'
        }
    });

    await prisma.actorMovie.create({
        data: {
            actorId: amyPoehler.id,
            movieId: insideOut.id,
        }
    });
    await prisma.actorMovie.create({
        data: {
            actorId: billHader.id,
            movieId: insideOut.id,
        }
    });
    await prisma.actorMovie.create({
        data: {
            actorId: amyAdams.id,
            movieId: arrival.id,
        }
    });
    await prisma.actorMovie.create({
        data: {
            actorId: jeremyRanner.id,
            movieId: arrival.id,
        }
    });
    await prisma.actorMovie.create({
        data: {
            actorId: jeremyRanner.id,
            movieId: weeksLater.id,
        }
    });
    await prisma.actorMovie.create({
        data: {
            actorId: robertCarlyle.id,
            movieId: weeksLater.id,
        }
    });
    await prisma.actorMovie.create({
        data: {
            actorId: amyAdams.id,
            movieId: bigEyes.id,
        }
    });
    await prisma.actorMovie.create({
        data: {
            actorId: christophWaltz.id,
            movieId: weeksLater.id,
        }
    });
}

async function main() {
    try {
        await movies();
        console.log('Seeded movies successfully');
    } catch (err) {
        console.error(`Error seeding movies: ${err}`);
        console.log('Aborting');
        return;
    }

    try {
        await actors();
        console.log('Seeded actors successfully');
    } catch (err) {
        console.error(`Error seeding actors: ${err}`);
        console.log('Aborting');
        return;
    }

    try {
        await actorMovies();
        console.log('Seeded actorMovies successfully');
    } catch (err) {
        console.error(`Error seeding actorMovies: ${err}`);
        console.log('Aborting');
        return;
    }
}
main()
    .finally(async () => {
        await prisma.$disconnect()
    })
