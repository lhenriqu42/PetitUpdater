import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";

interface IProps {
	title: string,
	gitLog: LogResult,
	repo: string,
	type: 'api' | 'web',
	callback: () => void,
}

export const Result: React.FC<IProps> = ({ gitLog, title, repo, type, callback }) => {

	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);


	const compile = async () => {
		try {
			setLoading(true);
			const response = await window.electron.reCompile(repo, type);
			alert(response);
		} catch (e) {
			console.log('Error on compile', e);
			alert('Error on compile: ' + e);
		} finally {
			setLoading(false);
		}
	};

	const update = async () => {
		try {
			setLoading(true);
			setError(false);
			const response = await window.electron.gitPull(repo);
			console.log('Pulled', response);
			await compile();
			callback();
		} catch (e) {
			setError(true);
			console.log('Error on pull', e);
			alert('Error on pull: ' + e);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={3} height={250}>
			<Typography variant="h4">
				{title}
			</Typography>
			<Box display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} gap={2}>
				<Typography>
					{gitLog.total === 0 ?
						`✔ Tudo em dia!`
						:
						`${gitLog.total} Atualizações Disponíveis! 🚨`
					}
				</Typography>
				<Box display={'flex'} flexDirection={'column'} gap={3}>
					{error &&
						<Alert severity="error" sx={{ borderRadius: 2 }}>
							❌ Erro ao atualizar o repositório!
						</Alert>
					}
					<Box display={'flex'} flexDirection={'column'} gap={1}>
						{
							gitLog.total !== 0 &&
							<Button variant="contained" color="warning" onClick={update} disabled={loading}>
								{loading ? <CircularProgress size={30} /> : 'Atualizar'}
							</Button>
						}
						<Button variant="contained" color="error" onClick={compile} disabled={loading}>
							{loading ? <CircularProgress size={30} /> : 'Compilar'}
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};