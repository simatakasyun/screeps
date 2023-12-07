var structureLink = {
    run: function () {
        const linkFrom = Game.rooms['W58S5'].lookForAt('structure', 41, 5)[0];
        const linkTo = linkFrom.pos.findInRange(FIND_MY_STRUCTURES, 50,
            { filter: { structureType: STRUCTURE_LINK } })[0];
        if(linkFrom.store.getUsedCapacity(RESOURCE_ENERGY) >= 0.5 * linkFrom.store.getCapacity(RESOURCE_ENERGY))
        linkFrom.transferEnergy(linkTo);
    }
}

module.exports = structureLink;