class ElectionsManger {
    constructor(db){
        
        this.db = db;
    }

    getVotes(){
        this.db.read()
        return this.db.get("votes");
    }

    getCandidates(){
        this.db.read()
        const candidates = this.db.get("candidates").value();

        return candidates;
    }

    addCandidate(name, party){
        this.db.read()
        if(this.db.get("candidates").find({name: name}).value() == undefined){
            this.db.get("candidates").push({
                name: name,
                party: party
            }).write();
        }
    }

    candidateExists(name){
        this.db.read();
        return this.db.get("candidates").find({name: name}).value() != undefined; 
    }

    removeCandidate(name){
        this.db.read()
        if(this.db.get("candidates").find({name: name}).value() != undefined){
            this.db.get("candidates").remove({name: name}).write();
            return true;
        }else{
            return false;   
        }
    }

    getCandidate(name){
        this.db.read()
        return this.db.get("candidates").find({name: name}).value();
    }

    vote(vid, sname){
        this.db.read()
        if(this.db.get("candidates").find({name: sname}).value() != undefined){
            this.db.get("votes").push({
                id: vid,
                sname: sname
            }).write();
        }
    }

    hasVoted(vid){
        this.db.read()
        return this.db.get("votes").find({id: vid}).value() != undefined;
    }

    getVotes(){
        this.db.read()
        const candidates = this.db.get("votes").value();

        return candidates;
    }

    removeVote(vid){
        this.db.read();

        if(this.hasVoted(vid)){
            this.db.get("votes").remove({id: vid}).write();
        }
    }

    clearVotes(){
        this.db.read();
        this.db.get("votes").value().forEach((vote) =>{this.db.get("votes").remove({id: vote.id}).write()});
    }

    getResults(){
        this.db.read()
        const votes = this.db.get("votes").value();
        const candidates = this.db.get("candidates").value();
        
        const groupByKey = (list, key) => list.reduce((hash, obj) => ({...hash, [obj[key]]:( hash[obj[key]] || [] ).concat(obj)}), {})

        let temp1 = [];

        if(candidates != undefined){
            for(let c of candidates){
                if(groupByKey(votes, "sname")[c.name] != undefined){
                    temp1.push({
                        name: c.name,
                        party: c.party,
                        votes: groupByKey(votes, "sname")[c.name].length
                    })
                }else{
                    temp1.push({
                        name: c.name,
                        party: c.party,
                        votes: 0
                    })
                }
                
            }


            const temp = temp1.sort((a, b) => (a.votes > b.votes) ? -1 : 1)
            const string = [];

            for(let t of temp){
                string.push(`- ${t.name} | ${t.party}: **${t.votes}**`)
            }
            
            return string.join("\n");
        }else{
            return "";
        }
    }

    blacklistUser(vid){
        if(!this.isBlacklisted(vid)){
            this.db.get("blacklist").push({
                id: vid
            }).write();
        }
    }

    removeBlacklist(vid){
        if(this.isBlacklisted(vid)){
            this.db.get("blacklist").remove({id: vid}).write();
        }
    }

    isBlacklisted(vid){
        this.db.read();
        return this.db.get("blacklist").find({id: vid}).value() != undefined;
    }

    getBlacklists(){
        this.db.read();
        return this.db.get("blacklist").value();
    }

    setElectionStatus(status){
        this.db.read();
        this.db.get("config").find({id: 1}).assign({status: status}).write();
    }

    getElectionStatus(){
        this.db.read();

        return this.db.get("config").value()[0].status;
    }
}

module.exports = ElectionsManger;