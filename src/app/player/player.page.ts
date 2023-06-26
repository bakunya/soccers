import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-player',
	templateUrl: './player.page.html',
	styleUrls: ['./player.page.scss'],
	standalone: true,
	imports: [IonicModule, CommonModule, FormsModule]
})
export class PlayerPage implements OnInit {
	public player: string = ""
	public playerId: string = ""
	public currImg: string = ""

	public dataPlayer: any|null = null
	public isErrorPlayer: boolean = false
	public isLoadingPlayer: boolean = false

	public dataFormerTeams: any[] = []
	public isErrorFormerTeams: boolean = false
	public isLoadingFormerTeams: boolean = false

	constructor(public route: ActivatedRoute, public router: Router, public location: Location) { 
		this.playerId = this.route.snapshot.paramMap.get("id") ?? ""
		this.route.queryParams.subscribe(params => {
			if(params['strPlayer']) { 
				try {
					this.player = params['strPlayer']
					this.currImg = params["strThumb"]
				} catch (e) {
					console.error(e)
					this.player = ""
				}
			}
		})
	}

	ngOnInit() {
		this.getPlayerData(this.playerId)
		this.getFormerTeams(this.playerId)
	}

	protected async getPlayerData(val: string) {
		this.isErrorPlayer = false
		this.isLoadingPlayer = true

		try {
			const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${val}`)
			if (res.status > 201) throw Error("Server error")
			const body = await res.json()	
			this.dataPlayer = body?.players[0] ?? {}
			console.log(this.dataPlayer)
		} catch (e: any) {
			this.isErrorPlayer = true
			console.error(e)
		} finally {
			this.isLoadingPlayer = false
		}
	}	

	protected async getFormerTeams(val: string): Promise<void> {
		this.isErrorFormerTeams = false
		this.isLoadingFormerTeams = true

		try {
			const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupformerteams.php?id=${val}`)
			if (res.status > 201) throw Error("Server error")
			const body = await res.json()	
			this.dataFormerTeams = body?.formerteams ?? []
			console.log(this.dataFormerTeams[0])
		} catch (e: any) {
			this.isErrorFormerTeams = true
			console.error(e)
		} finally {
			this.isLoadingFormerTeams = false
		}
	}

	public changeImg(curr: string) {
		this.currImg = curr
	}

	public back() {
		this.location.back()
	}
}
