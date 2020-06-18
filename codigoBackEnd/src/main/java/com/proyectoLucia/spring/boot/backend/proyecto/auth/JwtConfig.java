package com.proyectoLucia.spring.boot.backend.proyecto.auth;

public class JwtConfig {
	
	public static final String RSA_PRIVADA = "-----BEGIN RSA PRIVATE KEY-----\r\n" + 
			"MIIEpAIBAAKCAQEAt1A+tCqwF1uM5HTZ24M9lr0obegwMCuZ7dpnFr9+RKBH7NR5\r\n" + 
			"+hCvS717bPj/oafXYgA9SDPoaggE6DVL09OtEqS7fmI0mVpp7/PUb7GkWKhBGR5c\r\n" + 
			"O9VYUR0ig8CFVn2J50G51nogB+9dOPS85xJabx2pgxXCPSMtlgZf7RVwPkKHhEyH\r\n" + 
			"xfEUtVgGtNSDAc4BwWRJ4DB/XznRRstRcke66W7JP+Nkh9FHuS/AR9zhsDcYAF1N\r\n" + 
			"xeb//A5OLiO9/ejRcpFaky/bYRsc4kyan5C8gxZOkoD9x3sb56+IkkfytHGJvJLS\r\n" + 
			"OvtUTRkJNoDCmVqHjGYCMaZ0t7rjSne46U1jowIDAQABAoIBAGb4N1CizelA7sKB\r\n" + 
			"dMKeVOEwfd5G15KnWz7FOLUJedb4pY49yAqUhrMny4Xp1EYs7opJEiNVrQ6qVH9P\r\n" + 
			"OLnTJFvdlsgmR9+AbxNvRnw7L9LxKCgA6tRdQc/GatXRNdTgja8ON2JnlUh/x0Cw\r\n" + 
			"ENBHee8CnW5ZsZMACKJGEGovaa4+YvB+xpIrY6jNnVK7h3G15HaqBKWZS6J0ywPS\r\n" + 
			"B0N4WJt/lY8aHpEz37qqsc4mOq9XAfz1IeVkiW4olwvSXI7S2DL2fwiI0z8qlbxU\r\n" + 
			"Dh5eg2yD91I9RUW01sAzfPvattb+LN2FwuqCPpmwIuk0NWps1GTXh4nJHmorrwsw\r\n" + 
			"vi1mkVECgYEA5b3kRBHNZmoZM9CYrRRACTYQ6C+UcB1yW4RY33lzKRD2vgzfYTO0\r\n" + 
			"LCRA5NLqa/kVNjSXske5wHR30SyYbMOnUhSlOm3Q+QDG0EySv+s6CWIaXrtvHQTG\r\n" + 
			"+30UsoYeDILLkAAwa8ZwYc8pSsvdasSTv0dfwWI95XsEe4+vIxF4ESkCgYEAzEPj\r\n" + 
			"bzVsNLqD95mBoeOWSWb5NMFgUpLzcrkrhu2WnYscTimC/xy27NjAyk1fDHf08Uv9\r\n" + 
			"eG1EtmBxejNfy846hb6+9X1R1wjFlqkBDcsC8H+OhAsxgiohcsQkyiIAZHtXKL2R\r\n" + 
			"tKbeQ1x5scPGQVECWFpqaPCd0b5rR2hy6mdN6+sCgYAUUWryqjBkMlXwQy59gCD5\r\n" + 
			"r5JnNm4GTFRky5ugh/krVJi9zh2jVxNEJCCpHA4nZmv900DnP3iqEKLYGP2SAOu3\r\n" + 
			"UqQaOsQUgYETwvHnj0IeulJitmjpRBbk/vbpovrdWGPwZFPj9DTUMaIRP15hpuj6\r\n" + 
			"LbHGRI380Zhf5SE0FMNtoQKBgQCABBgYzWFoVnB4j8M3o3u/uwJ59quYdLKQds55\r\n" + 
			"vJNFXza5IbkQi311SI7i+sST+uYPB/HuNIT4y86yqFnkT/ZLdfUVw5mz67Jxrq+T\r\n" + 
			"ZmUMNtUpmh5IFoFp/NWVvOOEFezVAqG7l0z66Iz4RNsOeme+2cOQyyQNnIp9cU97\r\n" + 
			"6oxiSwKBgQCBsiC8pX8u7yiCtZ8nLf62FLwaTOzbWR0Y/taP9S8S39sgaNr1cGaq\r\n" + 
			"m140FmHaYYvIDiMhXsS5UH9P0mKy+VcSx2zDTbEl4vq+cF88j9ntRrT28MoJ4+9X\r\n" + 
			"fCLCvh+tbU3JyMSyjpR+2A2/ftuMZPfElFDz+61b09WC1eaUGOp5CA==\r\n" + 
			"-----END RSA PRIVATE KEY-----";
	
	public static final String RSA_PUBLICA = "-----BEGIN PUBLIC KEY-----\r\n" + 
			"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAt1A+tCqwF1uM5HTZ24M9\r\n" + 
			"lr0obegwMCuZ7dpnFr9+RKBH7NR5+hCvS717bPj/oafXYgA9SDPoaggE6DVL09Ot\r\n" + 
			"EqS7fmI0mVpp7/PUb7GkWKhBGR5cO9VYUR0ig8CFVn2J50G51nogB+9dOPS85xJa\r\n" + 
			"bx2pgxXCPSMtlgZf7RVwPkKHhEyHxfEUtVgGtNSDAc4BwWRJ4DB/XznRRstRcke6\r\n" + 
			"6W7JP+Nkh9FHuS/AR9zhsDcYAF1Nxeb//A5OLiO9/ejRcpFaky/bYRsc4kyan5C8\r\n" + 
			"gxZOkoD9x3sb56+IkkfytHGJvJLSOvtUTRkJNoDCmVqHjGYCMaZ0t7rjSne46U1j\r\n" + 
			"owIDAQAB\r\n" + 
			"-----END PUBLIC KEY-----";
}
