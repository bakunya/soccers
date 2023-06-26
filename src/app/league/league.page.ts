import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { decode } from 'js-base64';

@Component({
	selector: 'app-league',
	templateUrl: './league.page.html',
	styleUrls: ['./league.page.scss'],
	standalone: true,
	imports: [IonicModule, CommonModule, FormsModule]
})
export class LeaguePage implements OnInit {
	public team: string = ""
	public currImg: string = ""
	public data: any = null
	public currentTeam: any = null
	public isError: boolean = false
	public isLoading: boolean = false

	constructor(public route: ActivatedRoute, public router: Router, public location: Location) {}

	ngOnInit() {
		this.team = this.route.snapshot.paramMap.get("id") ?? ""
		this.getTeam(this.team)
		this.route.queryParams.subscribe(params => {
			if(params['c']) { 
				try {
					this.currentTeam = decode(params['c'])
					this.currentTeam = JSON.parse(this.currentTeam)
					this.currImg = this.currentTeam?.strTeamBadge ?? ''
				} catch (e) {
					console.error(e)
					this.currentTeam = null
				}
			}
		})
	}

	protected async getTeam(val: string): Promise<void> {
		this.isError = false
		this.isLoading = true

		try {
			const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=${val}`)
			if (res.status > 201) throw Error("Server error")
			const body = await res.json()	
			this.data = body?.player ?? []
			console.log(this.data[0])
		} catch (e: any) {
			this.isError = true
			console.error(e)
		} finally {
			this.isLoading = false
		}
	}

	public changeImg(curr: string) {
		this.currImg = curr
	}

	public back() {
		this.location.back()
	}

	public redirect(id: string, d: any) {
		this.router.navigate(['/player', id], { queryParams: { strPlayer: d.strPlayer, strThumb: d.strThumb } })
	}
}
