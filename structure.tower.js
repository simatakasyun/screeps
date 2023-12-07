var structureTower = {
    run: function (tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        var closestDamagedStructure = tower.pos.findInRange(FIND_STRUCTURES, 50);

        closestDamagedStructure.sort((a, b) => (a.hits / a.hitsMax) - (b.hits / b.hitsMax));


        if (closestHostile) {
            tower.attack(closestHostile);
        }
        else if (closestDamagedStructure[0] && closestDamagedStructure[0].hits < closestDamagedStructure[0].hitsMax && tower.store.getUsedCapacity(RESOURCE_ENERGY)
            > 0.8 * tower.store.getCapacity(RESOURCE_ENERGY)) {
            tower.repair(closestDamagedStructure[0]);
        }
    }
}

module.exports = structureTower;