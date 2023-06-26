import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { encode } from 'js-base64';
import { Router } from '@angular/router';

@Component({
	selector: 'app-league-search',
	templateUrl: './league-search.page.html',
	styleUrls: ['./league-search.page.scss'],
	standalone: true,
	imports: [IonicModule, CommonModule, FormsModule]
})
export class LeagueSearchPage implements OnInit {
	public isLoading: boolean = false
	public isError: boolean = false
	public data: any[] = []
	public searchVal: string = "English Premier League"

	constructor(public router: Router) { }

	protected async getLeague(val: string): Promise<void> {
		this.isError = false
		this.isLoading = true

		try {
			const res = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?l=${val}`)
			if (res.status > 201) throw Error("Server error")
			const body = await res.json()
			this.data = body?.teams ?? []
		} catch (e: any) {
			this.isError = true
			console.error(e)
		} finally {
			this.isLoading = false
		}
	}

	ngOnInit() {
		setTimeout(() => { this.getLeague(this.searchVal) }, 300);
	}

	public handleInput(e: any) {
		if (!e.currentTarget.value.trim()) return
		this.getLeague(e.currentTarget.value.trim())
		this.searchVal = e.currentTarget.value.trim()
	}

	public getRedirect(id: string, data: any) {
		const enc = encode(JSON.stringify({
			strTeam: data.strTeam,
			strAlternate: data.strAlternate,
			intFormedYear: data.intFormedYear,
			strLeague: data.strLeague,
			strWebsite: data.strWebsite,
			strFacebook: data.strFacebook,
			strTwitter: data.strTwitter,
			strInstagram: data.strInstagram,
			strDescriptionEN: data.strDescriptionEN,
			strTeamBadge: data.strTeamBadge,
			strTeamJersey: data.strTeamJersey,
			strTeamLogo: data.strTeamLogo,
			strTeamFanart1: data.strTeamFanart1,
		}))
		this.router.navigate([`/league`, `${id}`], { queryParams: { c: enc } })
	}

}
