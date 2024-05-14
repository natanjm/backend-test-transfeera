const regexByType = {
	CPF: /^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/,
	CNPJ: /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
	EMAIL: /^[a-z0-9+_.-]+@[a-z0-9.-]+$/,
	TELEFONE: /^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/,
	CHAVE_ALEATORIA: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
	MONGODB_ID: /^[0-9a-fA-F]{24}$/
}
export const validateCpfOrCnpj = (cpjOrCnpj: string): boolean => {
	return regexByType["CPF"].test(cpjOrCnpj) || regexByType["CNPJ"].test(cpjOrCnpj);
}

export const validateEmail = (email: string): boolean => {
	return regexByType["EMAIL"].test(email)
}

export const validatePixKeyType = (pixKeyType: string): boolean => {
	const validTypes = ["CPF", "CNPJ", "EMAIL", "TELEFONE", "CHAVE_ALEATORIA"]
	return validTypes.includes(pixKeyType)
}

export const validatePixKey = (pixKey: string, pixKeyType: string): boolean => {
	return regexByType[pixKeyType].test(pixKey)
}

export const validateStringArray = (list: string[]): boolean => {
	if (!Array.isArray(list)) {
		return false;
	}
	
	for (const item of list) {
		if (typeof item !== 'string') {
			return false;
		}
	}
	
	return true;
}

export const validateMongoDbId = (id: string): boolean => {
	return regexByType["MONGODB_ID"].test(id);
}