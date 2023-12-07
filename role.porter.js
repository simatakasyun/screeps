var rolePorter = {

    /** @param {Creep} creep **/
    run: function (creep) {
        //没有能量的时候去采集能量

        var porters = _.filter(Game.creeps, (creep) => creep.memory.role == 'porter');

        if (creep.memory.status == 0) {

            var sources = creep.room.find(FIND_STRUCTURES,
                {
                    filter: { structureType: STRUCTURE_LINK }
                });

            if (creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.status = 1;
            }
        }
        else {

            var Targets = creep.room.find(FIND_STRUCTURES,
                {
                    filter: { structureType: STRUCTURE_STORAGE }
                });

            if (creep.carry.energy == 0) {
                creep.memory.status = 0;
            }

            else {
                if (creep.transfer(Targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }


        }
    }
};

module.exports = rolePorter;